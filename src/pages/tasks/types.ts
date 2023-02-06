export type Task = {
  id: string;
  data: {
    name: string;
    createdBy: string;
    createdByDisplay: string;
    createdDate: number;
    duration: number;
  };
  processedOn: number;
  progress: number;
};
