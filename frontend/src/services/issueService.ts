
import api from './api';

export interface IssueReport {
  type: string;
  description: string;
}

export const reportIssue = async (data: IssueReport): Promise<any> => {
  const response = await api.post('/report-issue', data);
  return response.data;
};
