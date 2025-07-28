import {Control} from 'react-hook-form';

export interface InputBaseProps {
  control?: Control<any>;
  errorText?: string;
  label?: string;
  name?: string;
}
