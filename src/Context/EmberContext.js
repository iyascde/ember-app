import React, { createContext, useContext, useState } from 'react';

const EmberContext = createContext();

export function EmberProvider({ children }) {
  const [profile, setProfile] = useState({
    // caregiver
    caregiverName: 'Sarah',
    caregiverRelation: 'Daughter',
    // patient
    patientName: 'Maggie',
    patientFullName: 'Margaret Eleanor Webb',
    patientAge: '',
    patientStage: '',
    patientLanguage: 'English',
  });

  const updateProfile = (updates) => {
    setProfile(prev => ({ ...prev, ...updates }));
  };

  return (
    <EmberContext.Provider value={{ profile, updateProfile }}>
      {children}
    </EmberContext.Provider>
  );
}

export function useEmber() {
  return useContext(EmberContext);
}