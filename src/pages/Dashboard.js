import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import DisplayAuctionItems from "../components/DisplayAuctionItems";
import AddAuctionItem from "../components/AddAuctionItem";
import { FaPlus, FaSignOutAlt, FaClipboardList } from "react-icons/fa";
import { Navbar, Nav } from "react-bootstrap";

function Dashboard() {
    const navigate = useNavigate();
    const [isItems, setIsItems] = useState(true);
    const [activeTab, setActiveTab] = useState("items");
    const [filter, setFilter] = useState("all");

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate('/');
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate('/');
    };

    const handleTabChange = (tab) => {
        setIsItems(tab === "items");
        setActiveTab(tab);
    };

    return (
        <section className="d-flex flex-column">
            <Navbar bg="dark" variant="dark" expand="lg" className="p-2">
                <Navbar.Brand className="ms-3 text-white">Auction Dashboard</Navbar.Brand>
                <Nav className="ms-auto">
                    <Nav.Link 
                        className={`text-white ${activeTab === "items" ? "fw-bold" : ""}`} 
                        onClick={() => handleTabChange("items")}
                    >
                        <FaClipboardList className="me-2" /> Items
                    </Nav.Link>
                    <Nav.Link 
                        className={`text-white ${activeTab === "add" ? "fw-bold" : ""}`} 
                        onClick={() => handleTabChange("add")}
                    >
                        <FaPlus className="me-2" /> Create New Auction
                    </Nav.Link>
                    <Nav.Link className="text-danger fw-bold" onClick={handleLogout}>
                        <FaSignOutAlt /> Log out
                    </Nav.Link>
                </Nav>
            </Navbar>

            <div className="bg-light p-4 vh-100">
                {isItems ? <DisplayAuctionItems filter={filter} /> : <AddAuctionItem />}
            </div>
        </section>
    );
}

export default Dashboard;
