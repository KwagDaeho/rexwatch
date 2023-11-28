'use client';
import MainHeader from '@/components/MainHeader';
import SystemLogTable from '@/components/SystemLogTable';

function SystemLog() {
  return (
    <div>
      <MainHeader title={'시스템 로그'} />
      <SystemLogTable />
    </div>
  );
}

export default SystemLog;
