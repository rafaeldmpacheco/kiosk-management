export interface KioskType {
  id: String;
  serialKey: String;
  description: String;
  isKioskClosed: Boolean;
  storeOpensAt: Date;
  storeClosesAt: Date;
}

export interface TableProps {
  items: KioskType[];
  edit: Function;
  remove: Function;
}

export interface ThProps {
  children: React.ReactNode;
}

export interface TdProps {
  children: React.ReactNode;
}

export type ViewType = "list" | "crud";

export interface FormProps {
  callback: FormCallback;
}

export interface FormCallback {
  (kiosk: KioskType, isEditing: boolean): void;
}

export interface CheckProps {
  enabled: Boolean;
  labels: string[];
  callback: CheckCallback;
}

export interface CheckCallback {
  (enabled: boolean): void;
}

export interface TimePickerProps {
  label: string;
  callback: TimePickerCallback;
  defaultValue: Date;
}

export interface TimePickerCallback {
  (time: Date): void;
}

