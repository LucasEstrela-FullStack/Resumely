"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardFooter, CardHeader,CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
export default function ProfilePage() {
  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    city: "",
    zipcode: "",
    phone: "",
    linkedIn: "",
    portfolio: "",
    summary: "",
    skills: "",
    experience: "",
    education: "",
    achievements: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function fetchProfile() {
      const res = await fetch("/api/profile");
      if (res.ok) {
        const data = await res.json();
        setProfile({
          firstName: data.user?.firstName ?? "",
          lastName: data.user?.lastName ?? "",
          email: data.user?.email ?? "",
          address: data.user?.address ?? "",
          city: data.user?.city ?? "",
          zipcode: data.user?.zipcode ?? "",
          phone: data.user?.phone ?? "",
          linkedIn: data.user?.linkedIn ?? "",
          portfolio: data.user?.portfolio ?? "",
          summary: data.user?.summary ?? "",
          skills: data.user?.skills ?? "",
          experience: data.user?.experience ?? "",
          education: data.user?.education ?? "",
          achievements: data.user?.achievements ?? "",
        });
      }
    }
    fetchProfile();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("/api/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profile),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Falha na atualização");
      setMessage("Perfil atualizado com sucesso!");
    } catch (error) {
      setMessage(`${error.message}`);
    } finally {
      setLoading(false);
    }
  }

  function handleChange(field, value) {
    setProfile((prev) => ({ ...prev, [field]: value }));
  }

  return (
    <div className="min-h-screen pt-20 px-6 sm:px-10 bg-gradient-to-br from-background via-background to-muted/30 text-foreground transition-colors">
      <header className="mb-12 text-center sm:text-left">
        <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-500 to-emerald-500 dark:from-indigo-400 dark:to-emerald-400 bg-clip-text text-transparent">
          Configurações de perfil
        </h1>
        <p className="text-muted-foreground mt-2 text-base">
          Gerencie suas informações pessoais e mantenha os detalhes da sua conta atualizados.
        </p>
        <p className="text-sm text-muted-foreground mt-1">
          Campos marcados <span className="text-red-500">*</span> são obrigatórios.
        </p>
      </header>
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl mx-auto"
      >
        <Card className="bg-card/80 backdrop-blur-md border border-border rounded-3xl shadow-xl">
          <CardHeader>
            <CardTitle>Editar perfil</CardTitle>
            <CardDescription className="text-sm text-muted-foreground">
              Esses detalhes personalizarão seus currículos e cartas de apresentação.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {[
              ["Primeiro Nome", "firstName", "text", true],
              ["último Nome", "lastName", "text", true],
              ["Email", "email", "email", true],
              ["Endereço", "address", "text", true],
              ["Cidade", "city", "text", true],
              ["Número Postal", "zipcode", "text", true],
              ["Telefone", "phone", "text", true],
              ["LinkedIn Profile", "linkedIn", "text", false],
              ["Portfolio Website", "portfolio", "text", false],
            ].map(([label, key, type, isRequired], i) => (
              <div className="grid gap-2" key={i}>
                <Label htmlFor={key}>
                  {label}{" "}
                  {isRequired ? (
                    <span className="text-red-500">*</span>
                  ) : (
                    <span className="text-muted-foreground text-sm">
                      (optional)
                    </span>
                  )}
                </Label>
                <Input
                  id={key}
                  type={type}
                  value={profile[key] ?? ""}
                  onChange={(e) => handleChange(key, e.target.value)}
                  required={isRequired}
                />
              </div>
            ))}
                    {/* Summary */}
            <div className="grid gap-2">
              <Label htmlFor="summary">
                Resumo Profissional <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="summary"
                rows={3}
                placeholder="e.g. Full-stack developer with 5 years of experience..."
                value={profile.summary ?? ""}
                onChange={(e) => handleChange("summary", e.target.value)}
                required
              />
            </div>

            {/* Skills */}
            <div className="grid gap-2">
              <Label htmlFor="skills">
                Habilidades (separadas por vírgula) <span className="text-red-500">*</span>
              </Label>
              <Input
                id="skills"
                placeholder="React, Next.js, Node.js"
                value={profile.skills ?? ""}
                onChange={(e) => handleChange("skills", e.target.value)}
                required
              />
            </div>

            {/* Experiencia */}
            <div className="grid gap-2">
              <Label htmlFor="experience">
                Experiência <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="experience"
                rows={5}
                placeholder="Frontend Developer at TechWave (2020-2023): Built scalable UI..."
                value={profile.experience ?? ""}
                onChange={(e) => handleChange("experience", e.target.value)}
                required
              />
            </div>

            {/* Educação */}
            <div className="grid gap-2">
              <Label htmlFor="education">
                Educação <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="education"
                rows={3}
                placeholder="MIT - BSc Computer Science (2018)"
                value={profile.education ?? ""}
                onChange={(e) => handleChange("education", e.target.value)}
                required
              />
            </div>

            {/* Conquistas (opcional) */}
            <div className="grid gap-2">
              <Label htmlFor="achievements">
                Conquistas{" "}
                <span className="text-muted-foreground text-sm">(Opcional)</span>
              </Label>
              <Textarea
                id="achievements"
                rows={3}
                placeholder="AWS Certified Developer, Hackathon Winner 2021"
                value={profile.achievements ?? ""}
                onChange={(e) => handleChange("achievements", e.target.value)}
              />
            </div>
          </CardContent>
          <CardFooter className='flex justify-between items-center'>
            {message && (
                <p className="text-sm text-muted-foreground">{message}</p>
            )}
            <Button type = 'submit' disabled = {loading}  className="rounded-xl bg-gradient-to-r from-indigo-500 to-emerald-500 hover:opacity-90 text-white px-6 py-2 shadow-md">
                {loading ? "Salvando..." : "Salva as alterações"}
            </Button>
          </CardFooter>
        </Card>
      </motion.form>
    </div>
  );
}