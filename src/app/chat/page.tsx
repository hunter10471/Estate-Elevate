import ChatWindow from "@/components/large/ChatWindow/ChatWindow";
import { getSessionUser } from "../../../utils/helpers";

const page = async () => {
	const user = await getSessionUser();
	if (!user) {
		return <></>;
	}
	return (
		<ChatWindow
			chatPartner={user}
			sessionUser={user}
			initialMessages={[]}
			isMainPage
			chatId=""
		/>
	);
};

export default page;
