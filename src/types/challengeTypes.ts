import type { Dayjs } from "dayjs";
import type { CollectionStatus } from "@/types/collectionStatus";

export interface ChallengeDate {
  date: Date;
  id: string;
  isComplete: boolean;
}

export interface ChallengeStoreState {
  challengeName: string | null;
  challengeColor: string;
  challengeStartAt: Dayjs | null;
  challengeEndAt: Dayjs | null;
  chosenDays: Array<ChallengeWeekday>;
  challengeDates: Array<ChallengeDate> | null;
  challengeStatus: CollectionStatus;
}

export interface ChallengeWeekday {
  id: number;
  weekday: string;
  isChecked: boolean;
}
