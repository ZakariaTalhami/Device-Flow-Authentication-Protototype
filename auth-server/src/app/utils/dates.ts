const MILLISECONDS_IN_SECOND = 1000

export const getExpirationFromNow = (seconds: number): Date => {
    return new Date(Date.now() + seconds * MILLISECONDS_IN_SECOND);
}