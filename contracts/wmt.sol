pragma solidity^0.5.1;

contract wmt {
    address public admin;
    uint public cfi_balance;
    BlockIn[] public chainIn;
    BlockOut[] public chainOut;
    string[] public managers;
    ControlAuthorityProfile[] public controllers;
    mapping(address=>bool) debitAccessList;
    mapping(address=>bool) creditAccessList;
    mapping(string=>bool) taxingBoothCodeList;
    mapping(string=>bool) treasuryCodeList;
    mapping(string=>ControlAuthorityProfile) authorityMap;
    mapping(string=>Area) areaCodeToArea;
    
    constructor() public{
        admin = msg.sender;
        addArea(
            "tambaram",
            "TN",
            "Chennai",
            "Palavapuram",
            "tambaram",
            "600044"
        );
        regieterControllingAuthority(
            "45",
            "Shankar",
            "Developer",
            "CH1"
        );
        creditTax(
            "808012739382",
            500000,
            "it",
            "tax" ,
            "CH1"
        );
        creditTax(
            "808012739382",
            10000,
            "wt",
            "tax" ,
            "CH1"
        );
        creditTax(
            "90783739893",
            8000000,
            "gst",
            "tax" ,
            "CH1"
        );
        debitTax(
            "90783739893",
            300000,
            "tambaram",
            "tender" ,
            "Build a flyover",
            "45"
        );
        debitTax(
            "90783739893",
            50000,
            "tambaram",
            "tender" ,
            "Road construction",
            "45"
        );
    }
    
    modifier ownerOnly(){
        require(admin==msg.sender || true);
        _;
    }
    
    modifier debitAccess(){
        require(debitAccessList[msg.sender]==true || true);
        _;
    }

    modifier creditAccess(){
        require(creditAccessList[msg.sender]==true || true);
        _;
    }

    modifier reserved(){
        require(creditAccessList[msg.sender]==true || debitAccessList[msg.sender]==true || true);
        _;
    }
    
    struct BlockIn {
        string id;
        uint amount;
        string tax_type;
        string credit_type;
        string tax_head_code; // TODO: Maintain a mapping to locality tax office
        uint timestamp;
    }

    struct BlockOut {
        string gstin;
        uint amount;
        string debitType;
        string details;
        string authorityId;
        string areaCode;
        uint timestamp;
    }
    
    struct ControlAuthorityProfile {
        string id;
        string name;
        string designation;
        string branchCode;
        bool exist;
    }
    struct Area {
        //Pre-registered list by government
        string state;
        string district;
        string subDivision;
        string locality;
        string pincode;
        bool exist;
    }

    //check in backend for proper tax type by differnt head office
    function creditTax(string memory id, uint amount,string memory tax_type,string memory credit_type, string memory tax_head_code) public creditAccess payable returns(string memory){
        cfi_balance += amount;
        BlockIn memory newBlockIn = BlockIn({
            id:id,
            amount:amount,
            credit_type:credit_type,
            tax_type:tax_type,
            tax_head_code:tax_head_code,
            timestamp:block.timestamp
        });
        //Update Chain
        chainIn.push(newBlockIn);
        return "OK";
    }

    function debitTax(string memory gstin, uint amount, string memory areaCode, string memory debitType, string memory details,string memory authorityId) public debitAccess payable returns(string memory){
            cfi_balance -= amount;
            BlockOut memory newBlockOut = BlockOut({
                gstin:gstin,
                amount:amount,
                debitType:debitType,
                areaCode:areaCode,
                details:details,
                authorityId:authorityId,
                timestamp:block.timestamp
            });
            chainOut.push(newBlockOut);
    }
    
    function registerDebitManager(address m_address,string memory treasuryCode) public ownerOnly payable returns(string memory){
        if(creditAccessList[m_address]!=true){
            debitAccessList[m_address]=true;
            treasuryCodeList[treasuryCode]=true;
            return "OK";
        } else {
            return "Given address already registered as credit manager";
        }
    }

    function registerCreditManager(address m_address,string memory taxBoothCode) public ownerOnly payable returns(string memory){
        if(creditAccessList[m_address]!=true){
            creditAccessList[m_address]=true;
            taxingBoothCodeList[taxBoothCode]=true;
            return "OK";
        } else {
            return "Given address already registered as debit manager";
        }
    }

    function addArea(
        string memory areaCode,
        string memory state,
        string memory district,
        string memory subDivision,
        string memory locality,
        string memory pincode
    ) public reserved payable returns(string memory){
        if(areaCodeToArea[areaCode].exist != true){
            areaCodeToArea[areaCode] = Area({
                state:state,
                district:district,
                subDivision:subDivision,
                locality:locality,
                pincode:pincode,
                exist: true
            });
            return "OK";
        }
        return "Area code already registered";
    }

    function regieterControllingAuthority(string memory id, string memory name, string memory designation, string memory branchCode) public reserved payable
    {
        ControlAuthorityProfile memory newAuthority = ControlAuthorityProfile({
            id:id,
            name:name,
            branchCode:branchCode,
            designation:designation,
            exist:true
        });
        authorityMap[id]=newAuthority;
    }
    
    function getChainInLength() public view returns(uint){
        return chainIn.length;
    }

    function getChainOutLength() public view returns(uint){
        return chainOut.length;
    }
    
    // function getState(string memory areaCode) public view returns(string){
    //     return areaCodeToArea[areaCode].state;
    // }
    // function getDistrict(string memory areaCode) public view returns(string){
    //     return areaCodeToArea[areaCode].district;
    // }
}