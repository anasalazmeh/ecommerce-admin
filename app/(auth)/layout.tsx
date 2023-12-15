
const Authlayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex justify-center items-center py-16 bg-slate-100">
      {children}
    </div>
  );
};

export default Authlayout;
