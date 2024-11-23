import db from "@/app/lib/db";

export async function GET() {
  try {
    const [trainees] = await db.query("SELECT * FROM trainee");
    if (!trainees) {
      return new Response(JSON.stringify({ message: "ไม่พบข้อมูล" }));
    }
    return new Response(JSON.stringify(trainees));
  } catch (error) {
    return new Response(JSON.stringify({ error: "Internal Server Error" }));
  }
}

export async function POST(request) {
    try {
      const {
        trainee_name,
        trainee_email,
        trainee_phone,
        trainee_address,
        date_of_joining,
      } = await request.json();
  
      // Insert query
      const [new_trainees] = await db.query(
        "INSERT INTO trainee (trainee_name, trainee_email, trainee_phone, trainee_address, date_of_joining) VALUES (?, ?, ?, ?, ?)",
        [trainee_name, trainee_email, trainee_phone, trainee_address, date_of_joining]
      );
  
      // Check if the insert was successful
      if (new_trainees.affectedRows > 0) {
        return new Response(JSON.stringify({ message: "Trainee add successfully" }), { status: 200 });
      } else {
        return new Response(JSON.stringify({ error: "Error inserting trainer" }), { status: 400 });
      }
    } catch (err) {
      // Handle any errors that occur during the process
      return new Response(
        JSON.stringify({ error: err.message || "Internal Server Error" }),
        { status: 500 }
      );
    }
  }
  
