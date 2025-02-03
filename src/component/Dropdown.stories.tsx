import React from 'react';
import { Story, Meta } from '@storybook/react';
import SearchableDropdown, { SearchableDropdownProps, DropdownOption } from './Dropdown';

export default {
  title: 'Components/SearchableDropdown',
  component: SearchableDropdown,
} as Meta;

const Template: Story<SearchableDropdownProps> = (args) => <SearchableDropdown {...args} />;

const options: DropdownOption[] = [
  { label: 'Option 1', value: '1' },
  { label: 'Option 2', value: '2' },
  { label: 'Fried Chicken', value: '6' },
  { label: 'Grilled Chicken', value: '7' },
  { label: 'Fried Rice', value: '9' },
  { label: 'Grilled Rice', value: '10' },
];

export const Default = Template.bind({});
Default.args = {
  options,
  onChange: (selected) => console.log(selected),
  multiple: false,
  placeholder: 'Select...',
};

export const MultipleSelection = Template.bind({});
MultipleSelection.args = {
  options,
  onChange: (selected) => console.log(selected),
  multiple: true,
  placeholder: 'Select...',
};

export const Searchable = Template.bind({});
Searchable.args = {
  options,
  onChange: (selected) => console.log(selected),
  multiple: false,
  placeholder: 'Select...',
};