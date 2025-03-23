import React, { useEffect, useRef, useState } from "react";
import SearchInput from "../../components/form/SearchInput";
import { Skeleton } from "../../components/Skeleton";
import { UserModel } from "../../apis/models/user";

const Contacts = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  return (
    <div className="fixed top-0 left-0 sm:pl-[85px] p-3 sm:p-5 overflow-hidden w-full h-screen">
      <div className="flex justify-between px-2 h-16 items-center">
        <h2 className="font-bold text-[20px] text-neutralDark dark:text-neutral">
          Contacts
        </h2>
        <SearchInput show={(val) => {}} />
      </div>
      <div
        ref={containerRef}
        className="overflow-scroll relative scrollbar h-full"
      >
        <div
          className="flex justify-start gap-3 sticky top-0 bg-white dark:bg-Dark
           items-center w-[1280px] xl:w-full py-3 px-4 mt-2 border-b border-base"
        >
          <h2 className="font-semibold w-[300px] text-neutralDark dark:text-neutral">
            Nama Lengkap
          </h2>
          <h2 className="font-semibold w-[180px] text-neutralDark dark:text-neutral">
            No Telepon
          </h2>
          <h2 className="font-semibold w-[220px] text-neutralDark dark:text-neutral">
            Email
          </h2>
          <h2 className="font-semibold w-[100px] text-neutralDark dark:text-neutral">
            Role
          </h2>
          <h2 className="font-semibold w-[230px] text-neutralDark dark:text-neutral">
            Aktivitas Terakhir
          </h2>
          <h2 className="font-semibold text-neutralDark dark:text-neutral">
            Daftar Pada
          </h2>
        </div>
        {false ? (
          <>
            {Array.from({ length: 10 }).map(() => (
              <Skeleton />
            ))}
          </>
        ) : (
          <>
            {([] as UserModel[])?.map((contact) => (
              <div className="flex cursor-pointer bg-white gap-3 dark:bg-Dark text-neutralDark dark:text-neutral hover:bg-neutral dark:hover:bg-neutralDark justify-start items-center text-sm w-[1280px] xl:w-full py-2.5 px-4 border-b border-base">
                <div className="flex items-center gap-4 w-[300px]">
                  <img
                    src={contact?.avatar}
                    alt="contact profile"
                    className="w-[33px] h-[33px] rounded-full"
                  />
                  <div>{contact.fullName}</div>
                </div>
                <div className="w-[180px]">{contact?.phone}</div>
                <div className="w-[220px]">{contact?.email}</div>
                <div className="w-[100px]">{contact?.role}</div>
                <div className="w-[230px]">{contact.createdAt}</div>
                <div>{contact.createdAt}</div>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default Contacts;
