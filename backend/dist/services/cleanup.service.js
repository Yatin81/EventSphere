export class CleanupService {
    seatRepo;
    constructor(seatRepo) {
        this.seatRepo = seatRepo;
    }
    async cleanupExpiredLocks() {
        try {
            await this.seatRepo.releaseExpiredLocks();
            console.log(`[${new Date().toISOString()}] Cleanup: Expired seat locks released.`);
        }
        catch (error) {
            console.error("[Cleanup Service Error]:", error);
        }
    }
    start(intervalMs = 60000) {
        console.log(`[Cleanup Service]: Background sweep initialized (Interval: ${intervalMs}ms)`);
        setInterval(() => this.cleanupExpiredLocks(), intervalMs);
    }
}
