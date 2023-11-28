package br.cefet.aida.controller;

import br.cefet.aida.model.Usuario;
import br.cefet.aida.service.UsuarioService;

import java.util.List;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/v1/usuario")
public class UsuarioController {

    private final UsuarioService usuarioService;

    public UsuarioController(UsuarioService usuarioService) {
        this.usuarioService = usuarioService;
    }

    @GetMapping({ "/", "" })
    public List<Usuario> consultarTodos() {
        List<Usuario> usuarioList = usuarioService.consultarTodos();
        return usuarioList;
    }

    @GetMapping("/{idUsuario}")
    public Usuario consultarUsuario(@PathVariable("idUsuario") int idUsuario) {
        Usuario ret = usuarioService.consultarPorIdUsuario(idUsuario);
        return ret;
    }

    @PostMapping({ "", "/" })
    public Usuario inserir(@RequestBody Usuario usuario) {
        Usuario ret = usuarioService.inserir(usuario);
        return ret;
    }

    @GetMapping("/verificar/{email}")
    public boolean consultarEmail(@PathVariable("email") String email) {
        Usuario ret2 = usuarioService.consultarPorEmail(email);

        if (ret2 != null && ret2.getEmail().equals(email)) {
            return true;
        } else {
            return false;
        }
    }

    @GetMapping("/{email}/{senha}/authenticate")
    public Usuario autenticarUsuario(@PathVariable("email") String email, @PathVariable("senha") String senha) {
        Usuario ret = usuarioService.consultarPorEmail(email);

        if (ret != null && ret.getEmail().equals(email) && ret.getSenha().equals(senha)) {
            return ret;
        } else {
            return null;
        }
    }

    @PutMapping({ "", "/" })
    public Usuario alterar(@RequestBody Usuario usuario) {
        usuarioService.alterar(usuario);
        return usuario;
    }

    @DeleteMapping("/{idUsuario}")
    public Usuario alterar(@PathVariable("idUsuario") int idUsuario) {
        Usuario usuario = usuarioService.consultarPorIdUsuario(idUsuario);
        if (usuario == null) {
            throw new RuntimeException("Nao existe usuario com este id para ser excluido....");
        }
        usuarioService.excluir(idUsuario);
        return usuario;
    }

    @GetMapping("/recover/{email}")
    public Usuario recuperarSenha(@PathVariable("email") String email) {
        Usuario usuario = usuarioService.consultarPorEmail(email);

        if (usuario != null) {
            usuarioService.recoverSenha(usuario);
        }

        return usuario;
    }

}
