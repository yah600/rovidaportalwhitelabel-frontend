import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';

const NewIssue = () => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-1 flex-col gap-4">
      <h1 className="text-2xl font-semibold md:text-3xl">Create New Incident</h1>
      <div className="grid gap-4 py-4 max-w-2xl mx-auto w-full">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="title" className="text-right">
            Title
          </Label>
          <Input id="title" placeholder="Short summary of the incident" className="col-span-3" />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="description" className="text-right">
            Description
          </Label>
          <Textarea id="description" placeholder="Detailed description of the incident" className="col-span-3" />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="unit" className="text-right">
            Unit
          </Label>
          <Select>
            <SelectTrigger className="col-span-3">
              <SelectValue placeholder="Select unit" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="unit101">Unit 101</SelectItem>
              <SelectItem value="unit203">Unit 203</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="type" className="text-right">
            Type
          </Label>
          <Select>
            <SelectTrigger className="col-span-3">
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="plumbing">Plumbing</SelectItem>
              <SelectItem value="electrical">Electrical</SelectItem>
              <SelectItem value="hvac">HVAC</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="urgent" className="text-right">
            Urgent?
          </Label>
          <div className="col-span-3 flex items-center space-x-2">
            <Checkbox id="urgent" />
            <label
              htmlFor="urgent"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Mark as urgent
            </label>
          </div>
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="photos" className="text-right">
            Photos
          </Label>
          <Input id="photos" type="file" multiple className="col-span-3" />
        </div>
        <div className="col-span-4 flex justify-end mt-4">
          <Button type="submit">Create Incident</Button>
        </div>
      </div>
    </div>
  );
};

export default NewIssue;