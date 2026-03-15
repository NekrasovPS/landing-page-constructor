export type BlockProps = {
  title?: string;
  description?: string;
  backgroundImage?: string;
  buttonText?: string;
  [key: string]: string | undefined;
};

export interface BlockData {
  type: string;
  variant: string;
  props?: BlockProps;
}
