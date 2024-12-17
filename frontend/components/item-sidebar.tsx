import { ItemSidebarProps } from "@/interfaces/item-sidebar";


export default function ItemSidebar({title, url, icon : Icon , onClick} : ItemSidebarProps) {

    return (
        <a href={url} onClick={onClick}>
            <Icon />
            <span>{title}</span>
        </a>
    )
};
