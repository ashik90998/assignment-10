export const statusLabels = {
  pending: "Pending",
  inprogress: "In Progress",
  done: "Done",
  canceled: "Canceled",
};

export function getStatusColor(status) {
  switch (status) {
    case "pending":
      return "warning";
    case "inprogress":
      return "primary";
    case "done":
      return "success";
    case "canceled":
      return "danger";
    default:
      return "default";
  }
}

export function formatStatus(status) {
  return statusLabels[status] || status;
}

export function formatLocation(district, upazila) {
  return `${district}/${upazila}`;
}

export function formatDateTime(date, time) {
  if (!date) return "";
  const formatted = new Date(date).toLocaleDateString("en-GB");
  return { date: formatted, time: time || "" };
}
