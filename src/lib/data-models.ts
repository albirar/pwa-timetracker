/**
 * Class for track synchronization state of any register.
 */
export class Register {
    private _created: number;
    private _synchroTs: number;

    public get created() {
        return this._created;
    }

    public get synchroTs() {
        return this._synchroTs;
    }
    public set synchroTs(when: number) {
        let ts = Date.now();

        if(when > ts) {
            throw new Error("Synchronized timestamp cannot be after now");
        }
        this._synchroTs=when;
    }

    constructor() {
        this._created=Date.now();
        this._synchroTs=0;
    }
}

/**
 * The states of timetracker instance.
 */
export enum CheckState {
    CheckedOut,
    CheckedIn
}
/**
 * The applicable operations.
 */
export enum CheckOperation {
    CheckIn,
    CheckOut
}

/**
 * Class that holds the information of a check-in or check-out operation.
 */
 export class CheckRegister extends Register {
    private _tsCheckOperation: number = 0;
    private _checkOperation: CheckOperation = null;

    private constructor(moment: number, operation: CheckOperation) {
        super();
        this._tsCheckOperation = moment;
        this._checkOperation = operation;
    }
    public get tsCheckOperation () {
        return this._tsCheckOperation;
    }
    public get checkOperation () {
        return this._checkOperation;
    }
    /**
     * Create a register of check operation with the indicated information.
     * @param operation The operation
     * @param moment The moment, optional. If not indicated, assumes now
     * @returns The register
     */
    public static createRegister(operation: CheckOperation, moment?: number): CheckRegister {
        if(moment == undefined) {
            return new CheckRegister(Date.now(), operation);
        }
        return new CheckRegister(moment, operation);
    }
    /**
     * Create an automatic register operation based on {@link CurrentState.currentCheckState}.
     * Takes the {@link CurrentState.getNextOperation()} as operation and {@link Date.now()} as
     * the moment of operation.
     * @returns The register
     */
    public static createAutoRegister(): CheckRegister {
        return new CheckRegister(Date.now(), CurrentStateSingleton.getInstance().getNextOperation());
    }
}

/**
 * Holds the current state of timetracker.
 */
export interface CurrentState {
    /**
     * Gets the last moment current state changed.
     * @return The moment last changed
     */
    get lastChanged(): number;
    /**
     * Gets the current {@link CheckState|check state}.
     * @return The current {@link CheckState|check state}.
     */
    get currentCheckState(): CheckState;
    /**
     * Gets the applicable check operation based on {@link CurrentState.currentCheckState|currentCheckState}
     * @return The corresponding {@link CheckOperation}
     */
    getNextOperation(): CheckOperation;
}
/**
 * Singleton class to hold current timestracker instance states.
 */
export class CurrentStateSingleton implements CurrentState {
    private static instance: CurrentStateSingleton;

    private _lastChanged: number;
    private _currentCheckState: CheckState;
    private _lastCheckOperation: number;
    private _lastSynchronization: number;
    private _pendingSynchroRegisters: number;

    public get lastChanged(): number{
        return this._lastChanged;
    }
    public get currentCheckState():CheckState {
        return this._currentCheckState;
    }
    public getNextOperation(): CheckOperation {
        if(this._currentCheckState == CheckState.CheckedIn) {
            return CheckOperation.CheckOut;
        }
        return CheckOperation.CheckIn;
    }

    private constructor () {
        this._lastChanged=0;
        this._currentCheckState=CheckState.CheckedOut;
        this._lastCheckOperation=0;
        this._lastSynchronization=0;
        this._pendingSynchroRegisters=0;
    }

    newOperation(operation: CheckRegister) {
        if(operation.checkOperation == CheckOperation.CheckIn) {
            this._currentCheckState = CheckState.CheckedIn;
        } else {
            this._currentCheckState = CheckState.CheckedOut;
        }
        this._lastChanged = Date.now();
        this._lastCheckOperation = operation.tsCheckOperation;
    }
    static getInstanceLocal() : CurrentStateSingleton {
        this.getInstance();
        return CurrentStateSingleton.instance;
    }
    /**
     * Gets the singleton unique instance of this class.
     * @returns The singleton instance
     */
    public static getInstance(): CurrentState {
        if (!CurrentStateSingleton.instance) {
            CurrentStateSingleton.instance = new CurrentStateSingleton();
        }

        return CurrentStateSingleton.instance;
    }
}

export interface ApiCheckOperations {
    get currentState() : CheckState;
    get nextOperation() : CheckOperation;
    autoCheckOperation(moment?: number): CheckState;
}

export class ApiCheckOperationsSingleton implements ApiCheckOperations {
    private static instance: ApiCheckOperationsSingleton;

    private _operations:CheckRegister [];

    
    get currentState(): CheckState {
        return CurrentStateSingleton.getInstance().currentCheckState;
    }
    get nextOperation(): CheckOperation {
        return CurrentStateSingleton.getInstance().getNextOperation();
    }

    autoCheckOperation(moment?: number): CheckState {
        var reg: CheckRegister;

        reg = CheckRegister.createRegister(CurrentStateSingleton.getInstance().getNextOperation(), moment);
        CurrentStateSingleton.getInstanceLocal().newOperation(reg);
        return CurrentStateSingleton.getInstance().currentCheckState;
    }
    
    /**
     * Gets the singleton unique instance of this class.
     * @returns The singleton instance
     */
    public static getInstance(): ApiCheckOperationsSingleton {
        if (!ApiCheckOperationsSingleton.instance) {
            ApiCheckOperationsSingleton.instance = new ApiCheckOperationsSingleton();
        }

        return ApiCheckOperationsSingleton.instance;
    }
}