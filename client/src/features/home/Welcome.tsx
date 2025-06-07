import { Link } from 'react-router-dom';

const Welcome = () => {
    return (
        <div className="min-h-screen w-full flex items-center justify-center px-8 py-12">
            <div className="max-w-2xl text-center animate-fade-in-up">
                <h1 className="text-4xl font-semibold mb-4">
                    Welcome to The Platform
                </h1>
                <p className="text-lg text-primary leading-relaxed mb-8">
                    Your comprehensive platform for managing and accessing all your needs.
                    Get started by exploring our key features:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-xl mx-auto">
                    <Link
                        to="/dashboard"
                        className="p-4 rounded-lg bg-primary/5 hover:bg-primary/10 transition-colors duration-200"
                    >
                        <h3 className="font-medium text-lg mb-2">Dashboard</h3>
                        <p className="text-sm text-primary/70">View your overview and key metrics</p>
                    </Link>
                    <Link
                        to="/profile"
                        className="p-4 rounded-lg bg-primary/5 hover:bg-primary/10 transition-colors duration-200"
                    >
                        <h3 className="font-medium text-lg mb-2">Profile</h3>
                        <p className="text-sm text-primary/70">Manage your account settings</p>
                    </Link>
                    {/* <Link
                        to="/services"
                        className="p-4 rounded-lg bg-primary/5 hover:bg-primary/10 transition-colors duration-200"
                    >
                        <h3 className="font-medium text-lg mb-2">Services</h3>
                        <p className="text-sm text-primary/70">Explore our service offerings</p>
                    </Link>
                    <Link
                        to="/support"
                        className="p-4 rounded-lg bg-primary/5 hover:bg-primary/10 transition-colors duration-200"
                    >
                        <h3 className="font-medium text-lg mb-2">Support</h3>
                        <p className="text-sm text-primary/70">Get help and contact support</p>
                    </Link> */}
                </div>
            </div>
        </div>
    );
};

export default Welcome;
