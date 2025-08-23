import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Header from "@/components/shared/Header";
import MobileNavigation from "@/components/shared/MobileNavigation";
import OpportunityCard from "@/components/dashboard/OpportunityCard";
import { AdvancedFilter } from "@/components/advanced/AdvancedFilter";
import { PageTransition, StaggeredContainer, StaggeredItem } from "@/components/shared/PageTransition";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, Sliders, Grid, List } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";

export default function Opportunities() {
  const [search, setSearch] = useState("");
  const [type, setType] = useState("All Types");
  const [location, setLocation] = useState("All Locations");
  const [field, setField] = useState("All Fields");
  const [showAdvancedFilter, setShowAdvancedFilter] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [advancedFilters, setAdvancedFilters] = useState({});

  const { data: opportunities, isLoading, refetch } = useQuery({
    queryKey: ["/api/opportunities", { search, type, location, field }],
    enabled: true,
  });

  const handleSearch = () => {
    refetch();
  };

  const handleReset = () => {
    setSearch("");
    setType("All Types");
    setLocation("All Locations");
    setField("All Fields");
  };

  const activeFiltersCount = Object.keys(advancedFilters).filter(key => {
    const value = advancedFilters[key as keyof typeof advancedFilters];
    return value && (Array.isArray(value) ? value.length > 0 : value !== '');
  }).length;

  return (
    <PageTransition>
      <div className="min-h-screen bg-background transition-colors duration-300">
        <Header />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header Section */}
          <motion.div 
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2" data-testid="text-opportunities-title">
                  Discover Opportunities ✨
                </h1>
                <p className="text-muted-foreground">Find jobs, scholarships, and internships tailored for you</p>
              </div>
              <div className="flex items-center gap-3">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  data-testid="button-grid-view"
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  data-testid="button-list-view"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <Card className="mb-8 bg-card/80 backdrop-blur-sm border-border transition-colors duration-300">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center">
                  <Search className="h-5 w-5 mr-2" />
                  Search & Filter Opportunities
                </CardTitle>
                <div className="flex items-center gap-2">
                  {activeFiltersCount > 0 && (
                    <Badge variant="secondary">
                      {activeFiltersCount} filter{activeFiltersCount !== 1 ? 's' : ''} active
                    </Badge>
                  )}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowAdvancedFilter(true)}
                    className="transition-all duration-200 hover:scale-105"
                    data-testid="button-advanced-filter"
                  >
                    <Sliders className="h-4 w-4 mr-2" />
                    Advanced
                  </Button>
                </div>
              </div>
            </CardHeader>
          <CardContent className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search jobs, scholarships, internships..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
                data-testid="input-search-opportunities"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Select value={type} onValueChange={setType}>
                <SelectTrigger data-testid="select-opportunity-type">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All Types">All Types</SelectItem>
                  <SelectItem value="job">Jobs</SelectItem>
                  <SelectItem value="scholarship">Scholarships</SelectItem>
                  <SelectItem value="internship">Internships</SelectItem>
                  <SelectItem value="grant">Grants</SelectItem>
                </SelectContent>
              </Select>

              <Select value={location} onValueChange={setLocation}>
                <SelectTrigger data-testid="select-location">
                  <SelectValue placeholder="Location" />
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

              <Select value={field} onValueChange={setField}>
                <SelectTrigger data-testid="select-field">
                  <SelectValue placeholder="Field" />
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

              <div className="flex space-x-2">
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button onClick={handleSearch} className="flex-1 shadow-sm" data-testid="button-search">
                    <Search className="h-4 w-4 mr-2" />
                    Search
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button variant="outline" onClick={handleReset} data-testid="button-reset-filters">
                    <Filter className="h-4 w-4 mr-2" />
                    Reset
                  </Button>
                </motion.div>
              </div>
            </div>
          </CardContent>
        </Card>
        </motion.div>

        {/* Advanced Filter Modal */}
        <AdvancedFilter
          isOpen={showAdvancedFilter}
          onClose={() => setShowAdvancedFilter(false)}
          onApplyFilters={(filters) => {
            setAdvancedFilters(filters);
            // Apply filters to the query
            refetch();
          }}
          initialFilters={advancedFilters}
        />

        {/* Opportunities List */}
        <motion.div 
          className="space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          {isLoading ? (
            <StaggeredContainer className="grid gap-6" delay={0.1}>
              {[1, 2, 3, 4, 5].map((i) => (
                <StaggeredItem key={i}>
                  <Skeleton className="h-48 rounded-xl" />
                </StaggeredItem>
              ))}
            </StaggeredContainer>
          ) : (opportunities as any)?.length > 0 ? (
            <StaggeredContainer 
              className={`grid gap-6 ${
                viewMode === 'grid' 
                  ? 'grid-cols-1 lg:grid-cols-2 xl:grid-cols-3' 
                  : 'grid-cols-1'
              }`} 
              delay={0.1}
            >
              {(opportunities as any).map((opportunity: any, index: number) => (
                <StaggeredItem key={opportunity.id}>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05, duration: 0.3 }}
                    whileHover={{ y: -2, transition: { duration: 0.2 } }}
                  >
                    <OpportunityCard 
                      opportunity={opportunity} 
                      showActions 
                      compact={viewMode === 'list'}
                    />
                  </motion.div>
                </StaggeredItem>
              ))}
            </StaggeredContainer>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="text-center py-12 bg-card/80 backdrop-blur-sm border-border transition-colors duration-300">
                <CardContent>
                  <motion.div 
                    className="text-muted-foreground mb-4"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.4 }}
                  >
                    <Search className="h-16 w-16 mx-auto" />
                  </motion.div>
                  <motion.h3 
                    className="text-lg font-semibold text-foreground mb-2"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.4 }}
                  >
                    No opportunities found
                  </motion.h3>
                  <motion.p 
                    className="text-muted-foreground mb-4"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.4 }}
                  >
                    Try adjusting your search criteria or explore different filters.
                  </motion.p>
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.4 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button onClick={handleReset} variant="outline" data-testid="button-clear-filters">
                      Clear Filters
                    </Button>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </motion.div>
      </div>

      <MobileNavigation />
    </div>
    </PageTransition>
  );
}
