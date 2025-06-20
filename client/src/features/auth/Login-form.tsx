import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { useGoogleLogin } from "@react-oauth/google"
import { useNavigate } from "react-router"
import axios from "axios"
import Cookies from "js-cookie"
import { useDispatch } from "react-redux"
import { GET_USER_FAILURE, GET_USER_LOGIN, GET_USER_REQUEST, GET_USER_SUCCESS } from "@/redux/AppReducer/action-types"
import { useEffect } from "react"

export function LoginForm({
    className,
    ...props
}: React.ComponentProps<"div">) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

    }
    useEffect(() => {
        document.title = "PokéDex - login"
    }, [])
    const login = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            console.log('Login Success:', tokenResponse);
            dispatch({ type: GET_USER_REQUEST })

            // You can fetch user profile with tokenResponse.access_token
            const accessToken = tokenResponse.access_token;
            Cookies.set("accessToken", accessToken, { expires: 1 / 24 }); // 1 hour expiration
            Cookies.set("isLoggedIn", "true", { expires: 1 / 24 }); // 1 hour expiration
            const response = await axios.get(
                `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${accessToken}`
            );

            const userData = response.data;
            console.log(userData)
            dispatch({ type: GET_USER_LOGIN });
            dispatch({ type: GET_USER_SUCCESS, payload: userData })

            navigate("/dashboard")
        },
        onError: (error) => {
            console.log('Login Failed:', error);
            dispatch({ type: GET_USER_FAILURE })
        },
        flow: 'implicit', // or 'auth-code' if you're doing backend verification
    });

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <div className="flex items-center justify-center">
                <img
                    src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png"
                    alt="Pikachu"
                    className="h-8 w-8 mr-2"
                />
                <span className="text-xl font-bold text-primary">PokéDex</span>
            </div>
            <Card>
                <CardHeader className="text-center">
                    <CardTitle className="text-xl">Welcome</CardTitle>
                    <CardDescription>

                        Login with your Google account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit}>
                        <div className="grid gap-6">
                            <div className="flex flex-col gap-4">
                                <Button onClick={() => login()} variant="outline" className="w-full">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                        <path
                                            d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                                            fill="currentColor"
                                        />
                                    </svg>
                                    Login with Google
                                </Button>
                            </div>
                            {/* <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                                <span className="bg-card text-muted-foreground relative z-10 px-2">
                                    Or continue with
                                </span>
                            </div>
                            <div className="grid gap-6">
                                <div className="grid gap-3">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="m@example.com"
                                        required
                                        className={cn(
                                            "focus-visible:ring-2",
                                            emailError && "border-destructive focus-visible:ring-destructive"
                                        )}
                                        onChange={() => setEmailError(false)}
                                    />
                                </div>
                                <div className="grid gap-3">
                                    <div className="flex items-center">
                                        <Label htmlFor="password">Password</Label>
                                        <a
                                            href="#"
                                            className="ml-auto text-sm underline-offset-4 hover:underline"
                                        >
                                            Forgot your password?
                                        </a>
                                    </div>
                                    <Input
                                        id="password"
                                        type="password"
                                        required
                                        className={cn(
                                            "focus-visible:ring-2",
                                            passwordError && "border-destructive focus-visible:ring-destructive"
                                        )}
                                        onChange={() => setPasswordError(false)}
                                    />
                                </div>
                                <Button type="submit" className="w-full">
                                    Login
                                </Button>
                            </div> */}
                            {/* <div className="text-center text-sm">
                                Don&apos;t have an account?{" "}
                                <a href="#" className="underline underline-offset-4">
                                    Sign up
                                </a>
                            </div> */}
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
