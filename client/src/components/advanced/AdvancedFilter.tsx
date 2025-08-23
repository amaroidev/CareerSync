import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Filter, X, Search, MapPin, DollarSign, Calendar, Tag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface FilterOptions {
  search: string;
  type: string[];
  location: string;
  salaryRange: [number, number];
  deadline: string;
  skills: string[];
  company: string;
  experience: string;
  remote: boolean;
  partTime: boolean;
}

interface AdvancedFilterProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyFilters: (filters: FilterOptions) => void;
  initialFilters?: Partial<FilterOptions>;
}

const OPPORTUNITY_TYPES = ['job', 'internship', 'scholarship', 'grant'];
const EXPERIENCE_LEVELS = ['entry', 'mid', 'senior', 'executive'];
const DEADLINE_OPTIONS = [
  { value: 'week', label: 'Next 7 days' },
  { value: 'month', label: 'Next 30 days' },
  { value: '3months', label: 'Next 3 months' },
  { value: 'all', label: 'All time' },
];

export function AdvancedFilter({ isOpen, onClose, onApplyFilters, initialFilters }: AdvancedFilterProps) {
  const [filters, setFilters] = useState<FilterOptions>({
    search: initialFilters?.search || '',
    type: initialFilters?.type || [],
    location: initialFilters?.location || '',
    salaryRange: initialFilters?.salaryRange || [0, 200000],
    deadline: initialFilters?.deadline || 'all',
    skills: initialFilters?.skills || [],
    company: initialFilters?.company || '',
    experience: initialFilters?.experience || '',
    remote: initialFilters?.remote || false,
    partTime: initialFilters?.partTime || false,
  });

  const [skillInput, setSkillInput] = useState('');

  const handleTypeChange = (type: string, checked: boolean) => {
    setFilters(prev => ({
      ...prev,
      type: checked 
        ? [...prev.type, type]
        : prev.type.filter(t => t !== type)
    }));
  };

  const addSkill = (skill: string) => {
    if (skill && !filters.skills.includes(skill)) {
      setFilters(prev => ({
        ...prev,
        skills: [...prev.skills, skill]
      }));
      setSkillInput('');
    }
  };

  const removeSkill = (skill: string) => {
    setFilters(prev => ({
      ...prev,
      skills: prev.skills.filter(s => s !== skill)
    }));
  };

  const handleApply = () => {
    onApplyFilters(filters);
    onClose();
  };

  const handleReset = () => {
    setFilters({
      search: '',
      type: [],
      location: '',
      salaryRange: [0, 200000],
      deadline: 'all',
      skills: [],
      company: '',
      experience: '',
      remote: false,
      partTime: false,
    });
    setSkillInput('');
  };

  const activeFiltersCount = [
    filters.search,
    filters.type.length > 0,
    filters.location,
    filters.company,
    filters.experience,
    filters.skills.length > 0,
    filters.remote,
    filters.partTime,
    filters.deadline !== 'all',
    filters.salaryRange[0] > 0 || filters.salaryRange[1] < 200000,
  ].filter(Boolean).length;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <Card className="w-full max-w-4xl max-h-[90vh] overflow-auto">
              <CardHeader className="flex flex-row items-center justify-between">
                <div className="flex items-center gap-2">
                  <Filter className="h-5 w-5" />
                  <CardTitle>Advanced Filters</CardTitle>
                  {activeFiltersCount > 0 && (
                    <Badge variant="secondary">
                      {activeFiltersCount} filter{activeFiltersCount !== 1 ? 's' : ''} active
                    </Badge>
                  )}
                </div>
                <Button variant="ghost" size="sm" onClick={onClose}>
                  <X className="h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Search */}
                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <Search className="h-4 w-4" />
                    Search Keywords
                  </Label>
                  <Input
                    value={filters.search}
                    onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                    placeholder="e.g., machine learning, data science..."
                    data-testid="input-search-filter"
                  />
                </div>

                {/* Opportunity Types */}
                <div className="space-y-3">
                  <Label className="flex items-center gap-2">
                    <Tag className="h-4 w-4" />
                    Opportunity Types
                  </Label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {OPPORTUNITY_TYPES.map(type => (
                      <div key={type} className="flex items-center space-x-2">
                        <Checkbox
                          id={type}
                          checked={filters.type.includes(type)}
                          onCheckedChange={(checked) => handleTypeChange(type, !!checked)}
                          data-testid={`checkbox-type-${type}`}
                        />
                        <Label htmlFor={type} className="capitalize cursor-pointer">
                          {type}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                {/* Location and Company */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      Location
                    </Label>
                    <Input
                      value={filters.location}
                      onChange={(e) => setFilters(prev => ({ ...prev, location: e.target.value }))}
                      placeholder="e.g., San Francisco, Remote"
                      data-testid="input-location-filter"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Company</Label>
                    <Input
                      value={filters.company}
                      onChange={(e) => setFilters(prev => ({ ...prev, company: e.target.value }))}
                      placeholder="e.g., Google, Microsoft"
                      data-testid="input-company-filter"
                    />
                  </div>
                </div>

                {/* Salary Range */}
                <div className="space-y-3">
                  <Label className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4" />
                    Salary Range: ${filters.salaryRange[0].toLocaleString()} - ${filters.salaryRange[1].toLocaleString()}
                  </Label>
                  <Slider
                    value={filters.salaryRange}
                    onValueChange={(value) => setFilters(prev => ({ ...prev, salaryRange: value as [number, number] }))}
                    max={200000}
                    step={1000}
                    className="w-full"
                    data-testid="slider-salary-range"
                  />
                </div>

                <Separator />

                {/* Experience Level and Deadline */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Experience Level</Label>
                    <Select value={filters.experience} onValueChange={(value) => setFilters(prev => ({ ...prev, experience: value }))}>
                      <SelectTrigger data-testid="select-experience">
                        <SelectValue placeholder="Select experience level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">All levels</SelectItem>
                        {EXPERIENCE_LEVELS.map(level => (
                          <SelectItem key={level} value={level}>
                            {level.charAt(0).toUpperCase() + level.slice(1)} Level
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      Application Deadline
                    </Label>
                    <Select value={filters.deadline} onValueChange={(value) => setFilters(prev => ({ ...prev, deadline: value }))}>
                      <SelectTrigger data-testid="select-deadline">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {DEADLINE_OPTIONS.map(option => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Skills */}
                <div className="space-y-3">
                  <Label>Required Skills</Label>
                  <div className="flex gap-2">
                    <Input
                      value={skillInput}
                      onChange={(e) => setSkillInput(e.target.value)}
                      placeholder="Add skill..."
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          addSkill(skillInput);
                        }
                      }}
                      data-testid="input-skill"
                    />
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => addSkill(skillInput)}
                      data-testid="button-add-skill"
                    >
                      Add
                    </Button>
                  </div>
                  {filters.skills.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {filters.skills.map(skill => (
                        <Badge key={skill} variant="secondary" className="cursor-pointer" onClick={() => removeSkill(skill)}>
                          {skill} <X className="h-3 w-3 ml-1" />
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>

                {/* Work Options */}
                <div className="space-y-3">
                  <Label>Work Options</Label>
                  <div className="flex flex-wrap gap-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="remote"
                        checked={filters.remote}
                        onCheckedChange={(checked) => setFilters(prev => ({ ...prev, remote: !!checked }))}
                        data-testid="checkbox-remote"
                      />
                      <Label htmlFor="remote" className="cursor-pointer">Remote Work</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="partTime"
                        checked={filters.partTime}
                        onCheckedChange={(checked) => setFilters(prev => ({ ...prev, partTime: !!checked }))}
                        data-testid="checkbox-part-time"
                      />
                      <Label htmlFor="partTime" className="cursor-pointer">Part Time</Label>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 justify-end">
                  <Button variant="outline" onClick={handleReset} data-testid="button-reset-filters">
                    Reset All
                  </Button>
                  <Button onClick={handleApply} data-testid="button-apply-filters">
                    Apply Filters
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}