import { useState } from "react";
import { useLocation } from "wouter";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

export default function UniversalSearch() {
  const [, setLocation] = useLocation();
  const [search, setSearch] = useState("");
  const [type, setType] = useState("All Types");
  const [location_, setLocation_] = useState("All Locations");
  const [field, setField_] = useState("All Fields");

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (type !== "All Types") params.set("type", type);
    if (location_ !== "All Locations") params.set("location", location_);
    if (field !== "All Fields") params.set("field", field);
    
    setLocation(`/opportunities?${params.toString()}`);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <Input
          placeholder="Search jobs, scholarships, internships..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyPress={handleKeyPress}
          className="w-full pl-12 pr-4 py-3 text-lg"
          data-testid="input-universal-search"
        />
      </div>
      <div className="flex flex-wrap gap-3 mt-4">
        <Select value={type} onValueChange={setType}>
          <SelectTrigger className="w-auto min-w-32" data-testid="select-universal-type">
            <SelectValue placeholder="All Types" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All Types">All Types</SelectItem>
            <SelectItem value="job">Jobs</SelectItem>
            <SelectItem value="scholarship">Scholarships</SelectItem>
            <SelectItem value="internship">Internships</SelectItem>
            <SelectItem value="grant">Grants</SelectItem>
          </SelectContent>
        </Select>

        <Select value={location_} onValueChange={setLocation_}>
          <SelectTrigger className="w-auto min-w-32" data-testid="select-universal-location">
            <SelectValue placeholder="All Locations" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All Locations">All Locations</SelectItem>
            <SelectItem value="Remote">Remote</SelectItem>
            <SelectItem value="New York">New York</SelectItem>
            <SelectItem value="San Francisco">San Francisco</SelectItem>
            <SelectItem value="Los Angeles">Los Angeles</SelectItem>
            <SelectItem value="Chicago">Chicago</SelectItem>
            <SelectItem value="Boston">Boston</SelectItem>
          </SelectContent>
        </Select>

        <Select value={field} onValueChange={setField_}>
          <SelectTrigger className="w-auto min-w-32" data-testid="select-universal-field">
            <SelectValue placeholder="All Fields" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All Fields">All Fields</SelectItem>
            <SelectItem value="Computer Science">Computer Science</SelectItem>
            <SelectItem value="Engineering">Engineering</SelectItem>
            <SelectItem value="Business">Business</SelectItem>
            <SelectItem value="Healthcare">Healthcare</SelectItem>
            <SelectItem value="Education">Education</SelectItem>
            <SelectItem value="Arts">Arts</SelectItem>
          </SelectContent>
        </Select>

        <Button onClick={handleSearch} data-testid="button-universal-search">
          <Search className="h-4 w-4 mr-2" />
          Search
        </Button>
      </div>
    </div>
  );
}
