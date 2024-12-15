import { initializeSingleItemPage, initializeBidFeature } from '../../ui/auctionItem.js';

export default function initializeSingleItemView() {
  initializeSingleItemPage();
  initializeBidFeature();
}

// Immediately invoke the initialization
initializeSingleItemView();
