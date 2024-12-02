import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { LogOut, Search, UserPlus } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { auth, communications } from "../services/api";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";

interface CommunicationDetails {
  company: string;
  name: string;
  description: string;
  sequence: string;
  mandatoryFlag: boolean;
  date: string;
  performedBy: string;
}

const formatDate = (date: Date): string => {
  return date.toISOString().split("T")[0];
};

const AdminCommunication = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [companie, setcompanie] = useState([]);
  const [update, setupdate] = useState(false);
  const [_id, set_id] = useState("");
  const [addcommunication, setaddcommunication] = useState(false);
  const defaultcommunicationDetails = {
    company: id,
    name: "",
    description: "",
    sequence:
      "LinkedIn Post -> LinkedIn Message -> Email -> Phone Call -> Other",
    mandatoryFlag: false,
    date: formatDate(new Date()),
    performedBy: localStorage.getItem("identnt"),
  };
  const [communicationDetails, setcommunicationDetails] =
    useState<CommunicationDetails>(defaultcommunicationDetails);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    try {
      const { name, value } = e.target;
      console.log({ name, value });
      setcommunicationDetails((prevDetails) => ({
        ...prevDetails,
        [name]: name === "date" ? formatDate(new Date(value)) : value,
      }));
    } catch (error) {
      console.error("Error in change: ", error);
    }
  };

  const getallcommunication = async () => {
    try {
      const result = await communications.getAll(id);
      if (result) {
        setcompanie(result);
      }
    } catch (error) {
      console.error("Error in geting all company : ", error);
    }
  };

  useEffect(() => {
    getallcommunication();
  }, []);

  const handlesubmit = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      if (update) return;
      setaddcommunication(false);
      document.getElementById("addbtn").innerText = "Adding...";
      await communications.create(communicationDetails);
      document.getElementById("addbtn").innerText = "Add";
      getallcommunication();
      setcommunicationDetails(defaultcommunicationDetails);
    } catch (error) {
      console.error("Error in company creation : ", error);
    }
  };

  const handleDelete = async (email: string) => {
    try {
      await communications.delete(email);
      getallcommunication();
    } catch (error) {
      console.error("Erorr in delete company : ", error);
    }
  };

  const handleupdate = async (id: string) => {
    try {
      document.getElementById("updatebtn").innerText = "Updating...";
      await communications.update(id, communicationDetails);
      document.getElementById("updatebtn").innerText = "Update";
      setupdate(false);
      setaddcommunication(false);
      getallcommunication();
    } catch (error) {
      console.error("Error in handle update : ", error);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                localStorage.removeItem("entnttoken");
                navigate("/");
              }}
            >
              <LogOut className="w-4 h-4 mr-2" /> Sign Out
            </Button>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-8">
        {!addcommunication && (
          <div className="space-y-8">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <h2 className="text-2xl font-semibold">Communications</h2>
                <div className="relative">
                  {/* <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input className="pl-10" placeholder="Search users..." /> */}
                </div>
              </div>
              <Button
                onClick={() => {
                  setaddcommunication(true);
                  setcommunicationDetails(defaultcommunicationDetails);
                }}
              >
                <UserPlus className="w-4 h-4 mr-2" /> Add Communication
              </Button>
            </div>

            <div className="border rounded-lg">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Sequence</TableHead>
                    <TableHead>Mandatory Flag</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {companie &&
                    companie.length > 0 &&
                    companie.map((item, index) => {
                      return (
                        <>
                          <TableRow key={index}>
                            <TableCell className="font-medium">
                              {item.name}
                            </TableCell>
                            <TableCell>{item?.description}</TableCell>
                            <TableCell>{item?.sequence}</TableCell>
                            <TableCell>
                              {item?.mandatoryFlag === true ? "True" : "False"}
                            </TableCell>
                            <TableCell>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={(e) => {
                                  setaddcommunication(true);
                                  setupdate(true);
                                  console.log(item);
                                  const tempitem = item;
                                  tempitem.date = formatDate(
                                    new Date(item.date)
                                  );
                                  console.log(tempitem.date);
                                  setcommunicationDetails(tempitem);
                                  set_id(item?._id);
                                }}
                              >
                                Edit
                              </Button>
                            </TableCell>
                            <TableCell>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => {
                                  handleDelete(item?.emails);
                                }}
                              >
                                Delete
                              </Button>
                            </TableCell>
                          </TableRow>
                        </>
                      );
                    })}
                </TableBody>
              </Table>
            </div>
          </div>
        )}

        {addcommunication && (
          <div className="container mx-auto px-4 py-4 flex justify-between items-center flex-col">
            <form onSubmit={handlesubmit} className="space-y-4">
              <div className="space-y-2 w-[300px]">
                <label htmlFor="email" className="text-sm font-medium">
                  Name
                </label>
                <Input
                  id="name"
                  type="text"
                  name="name"
                  placeholder="LinkedIn Post || Visit || Email"
                  value={communicationDetails?.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Description
                </label>
                <Input
                  id="location"
                  type="text"
                  name="description"
                  placeholder="Detailed description for the communication"
                  value={communicationDetails?.description}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Sequence
                </label>
                <Input
                  id="linkedinProfile"
                  type="text"
                  name="sequence"
                  value={communicationDetails?.sequence}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="date" className="text-sm font-medium">
                  Date
                </label>
                <div className="flex space-x-4"></div>
                <Input
                  id="date"
                  type="date"
                  name="date"
                  value={communicationDetails.date} // Convert Date object to string
                  onChange={handleChange}
                  required
                  className="input-field"
                />
              </div>
              {/* <div className="space-y-2">
                <label htmlFor="mandatoryFlag" className="text-sm font-medium">
                  Mandatory Flag
                </label>
                <div className="flex space-x-4">
                  <label
                    htmlFor="mandatoryFlagTrue"
                    className="flex items-center"
                  >
                    <input
                      id="mandatoryFlagTrue"
                      type="radio"
                      name="mandatoryFlag"
                      value="true" // This is a string "true"
                      checked={communicationDetails?.mandatoryFlag === "true"}
                      onChange={handleChange}
                    />
                    <span className="ml-2">True</span>
                  </label>

                  <label
                    htmlFor="mandatoryFlagFalse"
                    className="flex items-center"
                  >
                    <input
                      id="mandatoryFlagFalse"
                      type="radio"
                      name="mandatoryFlag"
                      value="false" // This is a string "false"
                      checked={communicationDetails?.mandatoryFlag === "false"}
                      onChange={handleChange}
                    />
                    <span className="ml-2">False</span>
                  </label>
                </div>
              </div> */}

              <div className="flex items-center space-x-4">
                <label htmlFor="date" className="text-sm font-medium">
                  Mandatory
                </label>
                <Checkbox
                  checked={communicationDetails.mandatoryFlag}
                  onClick={() => {
                    setcommunicationDetails((prevDetails) => ({
                      ...prevDetails,
                      mandatoryFlag: !prevDetails.mandatoryFlag,
                    }));
                  }}
                  id="mandatoryFlag"
                  name="mandatoryFlag"
                />
              </div>

              {update ? (
                <Button
                  className="w-full"
                  onClick={() => {
                    handleupdate(_id);
                  }}
                  id="updatebtn"
                >
                  Update
                </Button>
              ) : (
                <Button type="submit" className="w-full" id="addbtn">
                  ADD
                </Button>
              )}
              <Button
                className="w-full"
                onClick={() => {
                  setaddcommunication(false);
                }}
              >
                Cancel
              </Button>
            </form>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminCommunication;
