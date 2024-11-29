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
import { useNavigate } from "react-router-dom";
import { auth, companies } from "../services/api";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";

interface CompanyDetails {
  name: string;
  location: string;
  linkedinProfile: string;
  emails: string;
  phoneNumbers: string;
  comments: string;
  communicationPeriodicity: string;
}

const UserDashboard = () => {
  const navigate = useNavigate();
  const [companie, setcompanie] = useState([]);
  const [addcompany, setaddcompany] = useState(false);
  const [companydetails, setcompanydetails] = useState<CompanyDetails>({
    name: "",
    location: "",
    linkedinProfile: "",
    emails: "",
    phoneNumbers: "",
    comments: "",
    communicationPeriodicity: "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    try {
      const { name, value } = e.target;
      // Properly update the state
      setcompanydetails((prevDetails) => ({
        ...prevDetails, // Spread the previous state
        [name]: value, // Update the specific field
      }));
    } catch (error) {
      console.error("Error in change: ", error);
    }
  };

  const getallcompany = async () => {
    try {
      const result = await companies.getAll();
      if (result) {
        setcompanie(result);
      }
      console.log("Company : ", result);
    } catch (error) {
      console.error("Error in geting all company : ", error);
    }
  };

  useEffect(() => {
    getallcompany();
  }, []);

  const handlesubmit = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      setaddcompany(false);
      await companies.create(companydetails);
      getallcompany();
    } catch (error) {
      console.error("Error in company creation : ", error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      console.log("Name : ", id);
      await companies.delete(id);
      getallcompany();
      console.log("Done");
    } catch (error) {
      console.log("Erorr in delete company : ", error);
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
        {!addcompany && (
          <div className="space-y-8">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <h2 className="text-2xl font-semibold">Companies</h2>
                <div className="relative">
                  {/* <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input className="pl-10" placeholder="Search users..." /> */}
                </div>
              </div>
              <Button
                onClick={() => {
                  setaddcompany(true);
                }}
              >
                <UserPlus className="w-4 h-4 mr-2" /> Add Company
              </Button>
            </div>

            <div className="border rounded-lg">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Linkedin Profile</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Phone Numbers</TableHead>
                    <TableHead>Comments</TableHead>
                    <TableHead>Communication Periodicity</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {companie &&
                    companie.length > 0 &&
                    companie.map((item, index) => {
                      return (
                        <>
                          <TableRow
                            key={index}
                            onClick={() => {
                              navigate(`/communication/${item?._id}`);
                            }}
                          >
                            <TableCell className="font-medium">
                              {item.name}
                            </TableCell>
                            <TableCell>{item?.location}</TableCell>
                            <TableCell>{item?.linkedinProfile}</TableCell>
                            <TableCell>{item?.emails}</TableCell>
                            <TableCell>{item?.phoneNumbers}</TableCell>
                            <TableCell>{item?.comments}</TableCell>
                            <TableCell>
                              {item?.communicationPeriodicity}
                            </TableCell>
                            <TableCell>
                              <Button variant="ghost" size="sm">
                                Edit
                              </Button>
                            </TableCell>
                            <TableCell>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => {
                                  navigate(`/communication/${item?._id}`);
                                }}
                              >
                                Details
                              </Button>
                            </TableCell>
                            <TableCell>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => {
                                  handleDelete(item?._id);
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

        {addcompany && (
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
                  value={companydetails?.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Location
                </label>
                <Input
                  id="location"
                  type="text"
                  name="location"
                  value={companydetails?.location}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Linkedin Profile
                </label>
                <Input
                  id="linkedinProfile"
                  type="text"
                  name="linkedinProfile"
                  value={companydetails?.linkedinProfile}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  name="emails"
                  value={companydetails?.emails}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Phone Number
                </label>
                <Input
                  id="phoneNumbers"
                  type="text"
                  name="phoneNumbers"
                  value={companydetails?.phoneNumbers}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Comments
                </label>
                <Input
                  id="comments"
                  type="text"
                  name="comments"
                  value={companydetails?.comments}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Communication Periodicity
                </label>
                <Input
                  id="communicationPeriodicity"
                  type="text"
                  name="communicationPeriodicity"
                  value={companydetails?.communicationPeriodicity}
                  onChange={handleChange}
                  required
                />
              </div>

              <Button type="submit" className="w-full">
                ADD
              </Button>
              <Button
                className="w-full"
                onClick={() => {
                  setaddcompany(false);
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

export default UserDashboard;
