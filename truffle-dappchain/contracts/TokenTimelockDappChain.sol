pragma solidity ^0.4.22;

import "openzeppelin-solidity/contracts/token/ERC20/ERC20.sol";

/**
 * @title TokenTimelockDappChain
 * @dev TokenTimelock is a token holder contract that will allow a
 * beneficiary to extract the tokens after a given release time
 */
contract TokenTimelockDappChain is ERC20 {

    // ERC20 basic token contract being held
    ERC20 public token;

    // beneficiary of tokens after they are released
    address public beneficiary;

    // timestamp when token release is enabled
    uint256 public releaseTime;

    constructor (ERC20 _token) public {
        // solium-disable-next-line security/no-block-members
        token = _token;
        releaseTime = 1544716954;
    }

    /**
     * @notice Transfers tokens held by timelock to beneficiary.
     */
    function release() public {
        // solium-disable-next-line security/no-block-members
        require(block.timestamp >= releaseTime);

        uint256 amount = token.balanceOf(address(this));
        require(amount > 0);

        token.transfer(msg.sender, amount);
    }
}