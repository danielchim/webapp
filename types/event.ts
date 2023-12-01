export interface HsuEvent {
  name: string,
  picture: File | null,
  fileName: string | null,
  permission: number,
  starttime: string | null,
  endtime: string | null,
  location: string | null,
  applicationDeadline: string | null,
  content: any
}
