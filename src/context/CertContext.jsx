import { createContext, useContext, useState } from 'react';
import { CERTIFICATIONS_INITIAL } from '../data/mockData';

const CertContext = createContext(null);

export function CertProvider({ children }) {
    const [certifications, setCertifications] = useState(CERTIFICATIONS_INITIAL);

    function addCertification(cert) {
        const newCert = { ...cert, id: 'cert-' + Date.now() };
        setCertifications(prev => [...prev, newCert]);
        return newCert;
    }

    function updateCertification(id, updates) {
        setCertifications(prev =>
            prev.map(c => (c.id === id ? { ...c, ...updates } : c))
        );
    }

    function deleteCertification(id) {
        setCertifications(prev => prev.filter(c => c.id !== id));
    }

    function getCertsByUser(userId) {
        return certifications.filter(c => c.userId === userId);
    }

    function getAllCerts() {
        return certifications;
    }

    return (
        <CertContext.Provider
            value={{ certifications, addCertification, updateCertification, deleteCertification, getCertsByUser, getAllCerts }}
        >
            {children}
        </CertContext.Provider>
    );
}

export function useCerts() {
    return useContext(CertContext);
}
