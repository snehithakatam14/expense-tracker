type Props = {
  balance: number;
};

const Balance = ({ balance }: Props) => (
  <div>
    <h4>Your Balance</h4>
    <h1>₹{balance}</h1>
  </div>
);

export default Balance;
