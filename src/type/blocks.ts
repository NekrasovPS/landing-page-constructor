export interface BlockProps {
  title?: string;
  description?: string;
  backgroundImage?: string;
  buttonText?: string;
}

export interface BlockData {
  type: string;
  variant: string;
  props?: BlockProps;
}
