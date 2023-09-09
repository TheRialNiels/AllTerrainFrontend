declare module "@/components/SwalAlerts/index" {
  export function SwalLoading();
  export function SwalCustomLoading(text: string);
  export function SwalClose();
  export function SwalCustom(title: string, text: string, icon: string);
  export function SwalCustomConfirm(title: string, text: string, icon: string, confirmBtn: string);
  export function SwalConfirmWithoutCancel(title: string, text: string, icon: string, confirmBtn: string);
  export function SwalSuccess(text: string);
  export function SwalError(text: string);
  export function SwalWarning(text: string);
  export function SwalInfo(text: string);
  export function SwalDelete(text: string);
}
