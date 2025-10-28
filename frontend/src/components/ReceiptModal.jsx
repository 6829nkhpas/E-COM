const ReceiptModal = ({ receipt, onClose }) => {
  if (!receipt) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full p-6 shadow-2xl">
        <div className="text-center mb-6">
          <div className="text-6xl mb-4">✅</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Order Confirmed!</h2>
          <p className="text-gray-600">Thank you for your purchase</p>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <div className="flex justify-between mb-2">
            <span className="text-gray-600">Receipt ID:</span>
            <span className="font-mono text-sm">{receipt.receiptId}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="text-gray-600">Name:</span>
            <span className="font-semibold">{receipt.name}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="text-gray-600">Email:</span>
            <span className="text-sm">{receipt.email}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="text-gray-600">Date:</span>
            <span className="text-sm">
              {new Date(receipt.timestamp).toLocaleString()}
            </span>
          </div>
          <div className="border-t border-gray-300 mt-3 pt-3">
            <div className="flex justify-between text-lg font-bold">
              <span>Total:</span>
              <span className="text-green-600">₹ {receipt.total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        <div className="mb-4">
          <h3 className="font-semibold mb-2">Items:</h3>
          <div className="space-y-2">
            {receipt.items.map((item, index) => (
              <div key={index} className="flex justify-between text-sm">
                <span>{item.name} x {item.qty}</span>
                <span>₹ {(item.price * item.qty).toFixed(2)}</span>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full btn-primary"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
};

export default ReceiptModal;
