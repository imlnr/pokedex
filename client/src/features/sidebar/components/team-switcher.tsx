import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import { AudioWaveform, } from "lucide-react"

export function TeamSwitcher() {


    return (
        <SidebarMenu>
            <SidebarMenuItem className="flex items-center justify-center">
                <SidebarMenuButton
                    size="lg"
                    className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                    <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                        {/* <activeTeam.logo className="size-4" /> */}
                        <AudioWaveform className="size-4" />
                    </div>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                        <span className="truncate font-medium">Pokemon Go</span>
                        <span className="truncate text-xs">Get all pokemons</span>
                    </div>
                </SidebarMenuButton>
            </SidebarMenuItem>
        </SidebarMenu>
    )
}
