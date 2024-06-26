import { ChevronDown, ChevronUp, Clapperboard, Home, Library, Repeat } from "lucide-react";
import { Children, ElementType, ReactNode, useState } from "react";
import { buttonStyles } from "../components/buttonStyles";
import { twMerge } from "tailwind-merge";
import { Button } from "../components/Button";

export function Sidebar() {
    return (
        <>
            <aside className="sticky top-0 overflow-y-auto scrollbar-hidden pb-4 flex flex-col ml-1 lg:hidden">
                <SmallSidebarItem Icon={Home} title="Home" url="/" />
                <SmallSidebarItem Icon={Repeat} title="Shorts" url="/shorts"/>
                <SmallSidebarItem Icon={Clapperboard} title="Subscriptions" url="/subscriptions"/>
                <SmallSidebarItem Icon={Library} title="Library" url="/library"/>
            </aside>
                
            <aside className="w-56 lg:sticky absolute top-0 overflow-y-auto scrollbar-hidden pb-4 flex-col gap-2p px-2 flex">
                <LargeSidebarSection>
                    <LargeSidebarItem isActive Icon={Home} title="Home" url="/"/>
                    <LargeSidebarItem Icon={Home} title="Home" url="/"/>
                </LargeSidebarSection>
            </aside>
        </>
    )
}

type SmallSidebarItemProps = {
    Icon: ElementType
    title: string
    url: string
}

function SmallSidebarItem({ Icon, title, url }: SmallSidebarItemProps) {
    return (
        <a href={url} className={twMerge(buttonStyles({ variant: "ghost", size: "icon" }), "py-4 px-1 flex flex-col items-center rounded:lg gap-1")}>
            <Icon className="w-6 h-6" />
            <div>{title}</div>
        </a>
    )
}

type LargeSidebarSectionProps = {
    children: ReactNode
    title?: string
    visibleItemCount?: number
}

function LargeSidebarSection({ children, title, visibleItemCount = Number.POSITIVE_INFINITY, }: LargeSidebarSectionProps) {
    const [isExpanded, setIsExpanded] = useState(false)
    const childrenArray = Children.toArray(children).flat()
    const showExpandedButton = childrenArray.length > visibleItemCount
    const visibleChildren = isExpanded ? childrenArray : childrenArray.slice(0, visibleItemCount)
    const ButtonIcon = isExpanded ? ChevronUp : ChevronDown

    return (
        <div>
            {title && <div className="ml-4 mt-2 text-lg mb-1">{title}</div>}
            {visibleChildren}
            {showExpandedButton && 
                <Button 
                onClick={() => setIsExpanded(e => !e)}
                variant="ghost" className="w-full flex items-center rounded-lg gap-4 p-3" >
                    <ButtonIcon className="w-6 h-6" />
                    <div>{isExpanded ? "Show Less" : "Show More"}</div>
                </Button>
            }
        </div>
    )
}

type LargeSidebarItemProps = {
    Icon: ElementType
    title: string
    url: string
    isActive?: boolean
}

function LargeSidebarItem({ Icon, title, url, isActive=false }:LargeSidebarItemProps) {
    return (
        <a href={url} className={twMerge(buttonStyles({ variant: "ghost" }), `w-full flex items-center rounded-lg gap-4 p-3 ${isActive ? "font-bold bg-neutral-100 hover:bg-secondary" : undefined}`)}>
            <Icon className="w-6 h-6" />
            <div className="whitespace-nowrap overflow-hidden text-ellipsis">
                {title}
            </div>
        </a>
    )
}