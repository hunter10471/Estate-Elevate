import { getCurrentUser } from "@/actions/userActions";
import Logo from "@/components/small/Logo/Logo";
import NavLinks from "@/components/small/NavLinks/NavLinks";

const Navbar = async () => {
	const user = await getCurrentUser();
	return (
		<nav className="flex justify-between items-center mx-auto w-[90%] h-[120px] z-[99999] fixed left-0 right-0 top-0 bg-white">
			<Logo />
			<NavLinks user={user} />
		</nav>
	);
};

export default Navbar;
