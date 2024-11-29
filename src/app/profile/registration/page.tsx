"use client";

import { useEffect } from "react";
import axios from "axios";

export default function ProfileRegistration(): JSX.Element {
  return (
    <div>
      <h1>Complete Your Profile</h1>
      <form>
        <div>
          <label>
            Name: <input type="text" name="name" required />
          </label>
        </div>
        <div>
          <label>
            Email: <input type="email" name="email" required />
          </label>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
