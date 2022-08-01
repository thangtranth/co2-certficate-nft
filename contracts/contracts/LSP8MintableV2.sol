// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

// modules
import { LSP8IdentifiableDigitalAsset } from "@lukso/lsp-smart-contracts/contracts/LSP8IdentifiableDigitalAsset/LSP8IdentifiableDigitalAsset.sol";
import { LSP8MintableCore } from "@lukso/lsp-smart-contracts/contracts/LSP8IdentifiableDigitalAsset/presets/LSP8MintableCore.sol";

/**
 * @dev LSP8 extension.
 */
contract LSP8Mintable is LSP8IdentifiableDigitalAsset, LSP8MintableCore {
  // solhint-disable no-empty-blocks
  /**
   * @notice Sets the token-Metadata and register LSP8InterfaceId
   * @param name_ The name of the token
   * @param symbol_ The symbol of the token
   * @param newOwner_ The owner of the the token-Metadata
   */
  constructor(
    string memory name_,
    string memory symbol_,
    address newOwner_
  ) LSP8IdentifiableDigitalAsset(name_, symbol_, newOwner_) {}

  /**
   * @inheritdoc LSP8MintableCore
   */
  function mint(
    address to,
    bytes32 tokenId,
    bool force,
    bytes memory data
  ) public override onlyOwner {
    _mint(to, tokenId, force, data);
  }

  function mintBatch(
    address to,
    bytes32[] calldata tokenIds,
    bool force,
    bytes memory data
  ) public onlyOwner {
    for (uint256 i = 0; i < tokenIds.length; i++) {
      _mint(to, tokenIds[i], force, data);
    }
  }
}
