import type { Meta, StoryObj } from "@storybook/react-vite";
import {
	Folder,
	MessageCircleQuestionMark,
	Pill,
	Puzzle,
	Settings,
	Table,
	Users,
} from "lucide-react";
import { Sidebar } from "../../../src";

const meta = {
	component: Sidebar,
	args: {
		header: {
			icon: <Pill size={50} />,
			iconOnClick: () => console.log("click"),
		},
		children: (
			<>
				<Sidebar.Item icon={<Table />} value="Data" onClick={() => console.log("click")} />
				<Sidebar.Item
					icon={<Users />}
					isActive
					value="Users"
					onClick={() => console.log("click")}
				/>
				<Sidebar.Item icon={<Folder />} value="Folders" onClick={() => console.log("click")} />
				<Sidebar.Item icon={<Puzzle />} value="Plugins" onClick={() => console.log("click")} />
				<Sidebar.Item icon={<Settings />} value="Settings" onClick={() => console.log("click")} />
				<Sidebar.Item
					icon={<MessageCircleQuestionMark />}
					value="Help"
					onClick={() => console.log("click")}
				/>
			</>
		),
	},
} satisfies Meta<typeof Sidebar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {};
