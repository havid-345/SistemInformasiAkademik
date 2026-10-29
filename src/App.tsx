/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { AcademicProvider, useAcademic } from './context/AcademicContext';
import { MainLayout } from './components/layout/MainLayout';
import { LoginPage } from './components/auth/LoginPage';
import { DashboardView } from './components/dashboard/DashboardView';
import { ProdiList } from './components/prodi/ProdiList';
import { KurikulumList } from './components/kurikulum/KurikulumList';
import { JenisNilaiList } from './components/jenisNilai/JenisNilaiList';
import { SemesterList } from './components/semester/SemesterList';
import { JadwalList } from './components/jadwal/JadwalList';
import { DosenList } from './components/dosen/DosenList';
import { KeuanganView } from './components/keuangan/KeuanganView';
import { RencanaStudiView } from './components/krs/RencanaStudiView';
import { PersetujuanKrsView } from './components/krs/PersetujuanKrsView';

const AcademicAppContent: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const { activeMenu } = useAcademic();

  if (!isAuthenticated) {
    return <LoginPage />;
  }

  const renderActiveModule = () => {
    switch (activeMenu) {
      case 'home':
        return <DashboardView />;
      case 'prodi':
        return <ProdiList />;
      case 'kurikulum':
        return <KurikulumList />;
      case 'jenisNilai':
        return <JenisNilaiList />;
      case 'semester':
        return <SemesterList />;
      case 'jadwal':
        return <JadwalList />;
      case 'dosen':
        return <DosenList />;
      case 'keuangan':
        return <KeuanganView />;
      case 'rencanaStudi':
        return <RencanaStudiView />;
      case 'persetujuanKrs':
        return <PersetujuanKrsView />;
      default:
        return <DashboardView />;
    }
  };

  return <MainLayout>{renderActiveModule()}</MainLayout>;
};

export default function App() {
  return (
    <AuthProvider>
      <AcademicProvider>
        <AcademicAppContent />
      </AcademicProvider>
    </AuthProvider>
  );
}
