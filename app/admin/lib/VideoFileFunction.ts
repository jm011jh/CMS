export const videoExtensions = [".mp4", ".mov", ".avi", ".mkv", ".webm", ".quicktime"];

export const isVideoFile = (fileName: string): boolean => {
  return videoExtensions.some(ext => fileName.toLowerCase().endsWith(ext));
};


export const millisecondsToHHmmss = (milliseconds: number): string => {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const hrs = Math.floor(totalSeconds / 3600);
  const mins = Math.floor((totalSeconds % 3600) / 60);
  const secs = totalSeconds % 60;

  return [
    hrs.toString().padStart(2, '0'),
    mins.toString().padStart(2, '0'),
    secs.toString().padStart(2, '0')
  ].join(':');
}

export const HHmmssTomilliseconds = (timeString: string): number => {
  const [hrs, mins, secs] = timeString.split(':').map(Number);
  return (hrs * 3600 + mins * 60 + secs) * 1000;
};