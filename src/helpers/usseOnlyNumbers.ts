export const useOnlyNumbers = (event: KeyboardEvent) => {

  const charCode = event.which ? event.which : event.keyCode;
  if (
    charCode > 31 &&
    (charCode < 48 || charCode > 57) &&
    charCode !== 46
  ) {
    event.preventDefault();
  }
}