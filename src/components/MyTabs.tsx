import { Tab, Tabs } from "@mui/material";
import React, { useState } from "react";

interface MyTabsProps {
  children: React.ReactNode;
  defaultTab?: number;
  labels: string[];
}

export const MyTabs = ({ children, defaultTab = 0, labels }: MyTabsProps) => {
  const [value, setValue] = useState<number>(defaultTab);

  const handleChange = (_event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <>
      <Tabs value={value} onChange={handleChange} centered>
        {labels.map((label, index) => (
          <Tab key={index} label={label} />
        ))}
      </Tabs>
      {children && React.Children.toArray(children)[value]}
    </>
  );
};
