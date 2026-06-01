'use client';
import { AddAgent } from '../organisms/AddAgent';
import { ListAgents } from '../organisms/ListAgents';

export const ManageAgents = () => {
  return (
    <div>
      <div className="flex justify-end">
        <AddAgent />
      </div>
      <ListAgents />
    </div>
  );
};
