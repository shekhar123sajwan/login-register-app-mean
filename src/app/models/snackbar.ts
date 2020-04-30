export interface SnackBar {
  data: {
    message: string;
    err: boolean;
    action?: boolean;
    actionBtn?: string;
  };
}
