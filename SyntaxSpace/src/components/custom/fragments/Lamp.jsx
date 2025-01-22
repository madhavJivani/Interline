"use client";
import React from "react";
import { motion } from "framer-motion";
import { LampContainer } from '@/components/ui/lamp'
import { useSelector } from "react-redux";

const Lamp = () => {
    const {user,status} = useSelector(state => state.user);
  return (
      <LampContainer>
          <motion.h1
              initial={{ opacity: 0.5, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                  delay: 0.3,
                  duration: 0.8,
                  ease: "easeInOut",
              }}
              className="mt-28 bg-gradient-to-br from-primary to-muted py-4 bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl"
          >
              <span
                  className="relative bg-gradient-to-r from-primary via-muted-foreground to-muted bg-clip-text text-transparent py-4"
                  style={{
                      textShadow: "0px 2px 4px rgba(0, 0, 0, 0.3)", // Subtle shadow
                  }}
              >
                  <span>Explore SyntaxSpace</span>
              </span>
              <br />
              <span  className="text-2xl">
              {status === 'loggedIn' ? `Welcome ${user.name}` : null}
              </span>
          </motion.h1>
      </LampContainer>
  )
}

export default Lamp