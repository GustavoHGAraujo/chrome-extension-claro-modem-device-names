const CellsIndex = {
    Name: 0,
    ConnectionMethod: 1,
    MacAddress: 3,
    IpAddress: 4
}

const Devices = [
    { name: 'My Device', mac: '11:22:33:ff:ff:ff'},
]

const observerParams = {
    attributes: true,
    characterData: true,
    childList: true,
    subtree: true
};

const wrapperObserver = new MutationObserver(() => {
    let table = getTable();

    if (table == undefined || table == null) {
        return
    }

    disableWrapperObserver();
    enableTableObserver();
});

const tableObserver = new MutationObserver(() => {
    renameDevicesOnTable(getTable());
});

const enableTableObserver = () => {
    tableObserver.observe(getTable(), observerParams);
}

const disableTableObserver = () => {
    tableObserver.disconnect();
}

const enableWrapperObserver = () => {
    wrapperObserver.observe(getWrapper(), observerParams);
}

const disableWrapperObserver = () => {
    wrapperObserver.disconnect();
}

const getTable = () => {
    return document.querySelector('#LanUserTable');
}

const getWrapper = () => {
    return document.querySelector('.wrapper-main');
}

const renameDevicesOnTable = (table) => {
    disableTableObserver();

    for (let i = 0; i < table.rows.length; i++) {
        let cells = table.rows.item(i).cells;

        let mac = cells.item(CellsIndex.MacAddress).innerText
        let device = Devices.find(device => device.mac == mac);

        cells.item(CellsIndex.Name).innerText = device.name;
    }

    enableTableObserver();
}

window.addEventListener('load', (event) => {
    enableWrapperObserver();
});