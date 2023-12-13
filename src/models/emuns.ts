export enum OrderStatuses {
    connecting = "connecting",
    accepted = "accepted",
    completed = "completed",
    systemTimeOut = "systemTimeOut",
    passengerCancelBeforeConfirm = "passengerCancelBeforeConfirm",
    noDriver = "noDriver",
    driverCancel = "driverCancel",
    passengerCancelAfterConfirm = "passengerCancelAfterConfirm",
}

export enum ConnectionStatuses {
    unconfirmed = "unconfirmed",
    driverRejected = "driverRejected",
    systemTimeOut = "systemTimeOut",
    driverTimeOut = "driverTimeOut",
    accepted = "accepted",
    passengerCancel = "passengerCancel",
}
