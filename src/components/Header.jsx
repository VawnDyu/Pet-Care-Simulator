function Header({ petName }) {
  return (
    <div>
      <h1>🐾 {petName ? `${petName}'s` : 'Pet'} Simulator 🐾</h1>
      <p>Keep your pet happy, fed, and full of energy!</p>
    </div>
  );
}

export default Header;