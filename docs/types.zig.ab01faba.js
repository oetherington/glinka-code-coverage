var data = {lines:[
{"lineNum":"    1","line":"// glinka"},
{"lineNum":"    2","line":"// Copyright (C) 2021-2022 Ollie Etherington"},
{"lineNum":"    3","line":"// <www.etherington.io>"},
{"lineNum":"    4","line":"//"},
{"lineNum":"    5","line":"// This program is free software: you can redistribute it and/or modify"},
{"lineNum":"    6","line":"// it under the terms of the GNU Affero General Public License as published"},
{"lineNum":"    7","line":"// by the Free Software Foundation, either version 3 of the License, or"},
{"lineNum":"    8","line":"// (at your option) any later version."},
{"lineNum":"    9","line":"//"},
{"lineNum":"   10","line":"// This program is distributed in the hope that it will be useful,"},
{"lineNum":"   11","line":"// but WITHOUT ANY WARRANTY; without even the implied warranty of"},
{"lineNum":"   12","line":"// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the"},
{"lineNum":"   13","line":"// GNU Affero General Public License for more details."},
{"lineNum":"   14","line":"//"},
{"lineNum":"   15","line":"// You should have received a copy of the GNU Affero General Public License"},
{"lineNum":"   16","line":"// along with this program. If not, see <http://www.gnu.org/licenses/>."},
{"lineNum":"   17","line":""},
{"lineNum":"   18","line":"const std = @import(\"std\");"},
{"lineNum":"   19","line":"const expectEqual = std.testing.expectEqual;"},
{"lineNum":"   20","line":"const Compiler = @import(\"compiler.zig\").Compiler;"},
{"lineNum":"   21","line":"const Cursor = @import(\"../common/cursor.zig\").Cursor;"},
{"lineNum":"   22","line":"const node = @import(\"../common/node.zig\");"},
{"lineNum":"   23","line":"const Node = node.Node;"},
{"lineNum":"   24","line":"const NodeType = node.NodeType;"},
{"lineNum":"   25","line":"const Type = @import(\"../common/types/type.zig\").Type;"},
{"lineNum":"   26","line":"const GenericError = @import(\"errors/generic_error.zig\").GenericError;"},
{"lineNum":"   27","line":"const RedefinitionError = @import(\"errors/redefinition_error.zig\").RedefinitionError;"},
{"lineNum":"   28","line":"const CompileError = @import(\"errors/compile_error.zig\").CompileError;"},
{"lineNum":"   29","line":"const CompilerTestCase = @import(\"compiler_test_case.zig\").CompilerTestCase;"},
{"lineNum":"   30","line":"const allocate = @import(\"../common/allocate.zig\");"},
{"lineNum":"   31","line":""},
{"lineNum":"   32","line":"pub fn hoistAlias(cmp: *Compiler, nd: Node) void {","class":"lineCov","hits":"2","order":"3024","possible_hits":"2",},
{"lineNum":"   33","line":"    std.debug.assert(nd.getType() == NodeType.Alias);","class":"lineCov","hits":"1","order":"3025","possible_hits":"1",},
{"lineNum":"   34","line":""},
{"lineNum":"   35","line":"    const alias = nd.data.Alias;","class":"linePartCov","hits":"2","order":"3026","possible_hits":"3",},
{"lineNum":"   36","line":"    const name = alias.name;","class":"lineCov","hits":"1","order":"3027","possible_hits":"1",},
{"lineNum":"   37","line":""},
{"lineNum":"   38","line":"    if (cmp.scope.getType(name)) |ty| {","class":"linePartCov","hits":"2","order":"3028","possible_hits":"3",},
{"lineNum":"   39","line":"        _ = ty;"},
{"lineNum":"   40","line":"        cmp.errors.append(CompileError.genericError(","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   41","line":"            GenericError.new(nd.csr, cmp.fmt(","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   42","line":"                \"Redefinition of type {s}\","},
{"lineNum":"   43","line":"                .{name},","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   44","line":"            )),"},
{"lineNum":"   45","line":"        )) catch allocate.reportAndExit();","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   46","line":"        return;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   47","line":"    }"},
{"lineNum":"   48","line":""},
{"lineNum":"   49","line":"    var t = allocate.create(cmp.alloc, Type);","class":"lineCov","hits":"1","order":"3029","possible_hits":"1",},
{"lineNum":"   50","line":"    t.* = Type{ .Alias = Type.AliasType.new(name, Type.hoistedSentinel) };","class":"lineCov","hits":"1","order":"3030","possible_hits":"1",},
{"lineNum":"   51","line":""},
{"lineNum":"   52","line":"    cmp.scope.putType(name, t);","class":"lineCov","hits":"1","order":"3031","possible_hits":"1",},
{"lineNum":"   53","line":"}"},
{"lineNum":"   54","line":""},
{"lineNum":"   55","line":"pub fn processAlias(cmp: *Compiler, nd: Node) void {","class":"lineCov","hits":"2","order":"3039","possible_hits":"2",},
{"lineNum":"   56","line":"    std.debug.assert(nd.getType() == NodeType.Alias);","class":"lineCov","hits":"1","order":"3040","possible_hits":"1",},
{"lineNum":"   57","line":""},
{"lineNum":"   58","line":"    const alias = nd.data.Alias;","class":"linePartCov","hits":"2","order":"3041","possible_hits":"3",},
{"lineNum":"   59","line":"    const name = alias.name;","class":"lineCov","hits":"1","order":"3042","possible_hits":"1",},
{"lineNum":"   60","line":"    const ty = cmp.findType(alias.value) orelse {","class":"lineCov","hits":"2","order":"3043","possible_hits":"2",},
{"lineNum":"   61","line":"        cmp.errors.append(CompileError.genericError(","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   62","line":"            GenericError.new(nd.csr, cmp.fmt(","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   63","line":"                \"Target type for alias \'{s}\' cannot be resolved\","},
{"lineNum":"   64","line":"                .{name},","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   65","line":"            )),"},
{"lineNum":"   66","line":"        )) catch allocate.reportAndExit();","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   67","line":"        return;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   68","line":"    };"},
{"lineNum":"   69","line":""},
{"lineNum":"   70","line":"    if (cmp.scope.getTypeMut(name)) |aliasTy| {","class":"lineCov","hits":"3","order":"3059","possible_hits":"3",},
{"lineNum":"   71","line":"        std.debug.assert(aliasTy.getType() == .Alias);","class":"lineCov","hits":"1","order":"3064","possible_hits":"1",},
{"lineNum":"   72","line":"        std.debug.assert(aliasTy.Alias.ty.isHoistedSentinel());","class":"linePartCov","hits":"2","order":"3065","possible_hits":"3",},
{"lineNum":"   73","line":"        aliasTy.Alias.ty = ty;","class":"linePartCov","hits":"2","order":"3066","possible_hits":"3",},
{"lineNum":"   74","line":"        cmp.typebook.putAlias(aliasTy);","class":"lineCov","hits":"1","order":"3067","possible_hits":"1",},
{"lineNum":"   75","line":"    } else {"},
{"lineNum":"   76","line":"        std.debug.panic(\"Alias type \'{s}\' has not been prepared!\", .{name});","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   77","line":"    }"},
{"lineNum":"   78","line":"}"},
{"lineNum":"   79","line":""},
{"lineNum":"   80","line":"test \"can compile a type alias declaration\" {","class":"lineCov","hits":"2","order":"2907","possible_hits":"2",},
{"lineNum":"   81","line":"    try (CompilerTestCase{","class":"lineCov","hits":"1","order":"3093","possible_hits":"1",},
{"lineNum":"   82","line":"        .code = \"type ATypeAlias = number | boolean;\","},
{"lineNum":"   83","line":"    }).run();","class":"lineCov","hits":"1","order":"2908","possible_hits":"1",},
{"lineNum":"   84","line":"}"},
{"lineNum":"   85","line":""},
{"lineNum":"   86","line":"test \"aliases don\'t share scope with variables\" {","class":"lineCov","hits":"2","order":"3094","possible_hits":"2",},
{"lineNum":"   87","line":"    try (CompilerTestCase{","class":"lineCov","hits":"1","order":"3199","possible_hits":"1",},
{"lineNum":"   88","line":"        .code = \"type AnAlias = number; const AnAlias = 0;\","},
{"lineNum":"   89","line":"    }).run();","class":"lineCov","hits":"1","order":"3095","possible_hits":"1",},
{"lineNum":"   90","line":"}"},
{"lineNum":"   91","line":""},
{"lineNum":"   92","line":"pub fn hoistInterface(cmp: *Compiler, nd: Node) void {","class":"lineCov","hits":"2","order":"3246","possible_hits":"2",},
{"lineNum":"   93","line":"    std.debug.assert(nd.getType() == NodeType.InterfaceType);","class":"lineCov","hits":"1","order":"3247","possible_hits":"1",},
{"lineNum":"   94","line":""},
{"lineNum":"   95","line":"    const in = nd.data.InterfaceType;","class":"linePartCov","hits":"2","order":"3248","possible_hits":"3",},
{"lineNum":"   96","line":""},
{"lineNum":"   97","line":"    const name = if (in.name) |nm|","class":"lineCov","hits":"2","order":"3249","possible_hits":"2",},
{"lineNum":"   98","line":"        nm","class":"lineCov","hits":"1","order":"3250","possible_hits":"1",},
{"lineNum":"   99","line":"    else"},
{"lineNum":"  100","line":"        std.debug.panic(\"Invalid InterfaceType node (has no name)\", .{});","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  101","line":""},
{"lineNum":"  102","line":"    if (cmp.scope.getType(name)) |ty| {","class":"lineCov","hits":"2","order":"3251","possible_hits":"2",},
{"lineNum":"  103","line":"        _ = ty;"},
{"lineNum":"  104","line":"        return;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  105","line":"    }"},
{"lineNum":"  106","line":""},
{"lineNum":"  107","line":"    var ty = allocate.create(cmp.alloc, Type);","class":"lineCov","hits":"1","order":"3252","possible_hits":"1",},
{"lineNum":"  108","line":"    ty.* = Type{","class":"lineCov","hits":"1","order":"3253","possible_hits":"1",},
{"lineNum":"  109","line":"        .Interface = Type.InterfaceType.new(","class":"lineCov","hits":"1","order":"3254","possible_hits":"1",},
{"lineNum":"  110","line":"            &[_]Type.InterfaceType.Member{},"},
{"lineNum":"  111","line":"        ),"},
{"lineNum":"  112","line":"    };"},
{"lineNum":"  113","line":""},
{"lineNum":"  114","line":"    cmp.scope.putType(name, ty);","class":"lineCov","hits":"1","order":"3255","possible_hits":"1",},
{"lineNum":"  115","line":"}"},
{"lineNum":"  116","line":""},
{"lineNum":"  117","line":"pub fn processInterface(cmp: *Compiler, nd: Node) void {","class":"lineCov","hits":"2","order":"3257","possible_hits":"2",},
{"lineNum":"  118","line":"    std.debug.assert(nd.getType() == NodeType.InterfaceType);","class":"lineCov","hits":"1","order":"3258","possible_hits":"1",},
{"lineNum":"  119","line":""},
{"lineNum":"  120","line":"    const in = nd.data.InterfaceType;","class":"linePartCov","hits":"2","order":"3259","possible_hits":"3",},
{"lineNum":"  121","line":""},
{"lineNum":"  122","line":"    const name = if (in.name) |nm|","class":"lineCov","hits":"2","order":"3260","possible_hits":"2",},
{"lineNum":"  123","line":"        nm","class":"lineCov","hits":"1","order":"3261","possible_hits":"1",},
{"lineNum":"  124","line":"    else"},
{"lineNum":"  125","line":"        std.debug.panic(\"Invalid InterfaceType node (has no name)\", .{});","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  126","line":""},
{"lineNum":"  127","line":"    const members = allocate.alloc(","class":"lineCov","hits":"1","order":"3264","possible_hits":"1",},
{"lineNum":"  128","line":"        cmp.alloc,","class":"lineCov","hits":"1","order":"3262","possible_hits":"1",},
{"lineNum":"  129","line":"        Type.InterfaceType.Member,"},
{"lineNum":"  130","line":"        in.members.items.len,","class":"lineCov","hits":"1","order":"3263","possible_hits":"1",},
{"lineNum":"  131","line":"    );"},
{"lineNum":"  132","line":""},
{"lineNum":"  133","line":"    for (in.members.items) |member, index| {","class":"lineCov","hits":"2","order":"3265","possible_hits":"2",},
{"lineNum":"  134","line":"        if (cmp.findType(member.ty)) |ty| {","class":"lineCov","hits":"3","order":"3266","possible_hits":"3",},
{"lineNum":"  135","line":"            members[index] = Type.InterfaceType.Member{","class":"linePartCov","hits":"1","order":"3267","possible_hits":"2",},
{"lineNum":"  136","line":"                .name = member.name,","class":"lineCov","hits":"1","order":"3268","possible_hits":"1",},
{"lineNum":"  137","line":"                .ty = ty,","class":"lineCov","hits":"1","order":"3269","possible_hits":"1",},
{"lineNum":"  138","line":"            };"},
{"lineNum":"  139","line":"        } else {"},
{"lineNum":"  140","line":"            cmp.errors.append(CompileError.genericError(","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  141","line":"                GenericError.new(nd.csr, cmp.fmt(","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  142","line":"                    \"Member \'{s}\' of interface \'{s}\' has an invalid type\","},
{"lineNum":"  143","line":"                    .{ member.name, name },","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  144","line":"                )),"},
{"lineNum":"  145","line":"            )) catch allocate.reportAndExit();","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  146","line":"            return;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  147","line":"        }"},
{"lineNum":"  148","line":"    }"},
{"lineNum":"  149","line":""},
{"lineNum":"  150","line":"    if (cmp.scope.getTypeMut(name)) |inTy| {","class":"lineCov","hits":"3","order":"3270","possible_hits":"3",},
{"lineNum":"  151","line":"        std.debug.assert(inTy.getType() == .Interface);","class":"lineCov","hits":"1","order":"3271","possible_hits":"1",},
{"lineNum":"  152","line":"        std.debug.assert(inTy.Interface.members.len == 0);","class":"linePartCov","hits":"2","order":"3272","possible_hits":"3",},
{"lineNum":"  153","line":"        inTy.Interface.members = members;","class":"linePartCov","hits":"2","order":"3273","possible_hits":"3",},
{"lineNum":"  154","line":"        cmp.typebook.putInterface(inTy);","class":"lineCov","hits":"1","order":"3274","possible_hits":"1",},
{"lineNum":"  155","line":"    } else {"},
{"lineNum":"  156","line":"        std.debug.panic(\"Interface type \'{s}\' has not been prepared!\", .{name});","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  157","line":"    }"},
{"lineNum":"  158","line":"}"},
{"lineNum":"  159","line":""},
{"lineNum":"  160","line":"test \"can compile an interface declaration\" {","class":"lineCov","hits":"2","order":"3200","possible_hits":"2",},
{"lineNum":"  161","line":"    try (CompilerTestCase{","class":"lineCov","hits":"1","order":"3278","possible_hits":"1",},
{"lineNum":"  162","line":"        .code = \"interface Inter { aString: string; aUnion: number | null; }\","},
{"lineNum":"  163","line":"    }).run();","class":"lineCov","hits":"1","order":"3201","possible_hits":"1",},
{"lineNum":"  164","line":"}"},
{"lineNum":"  165","line":""},
{"lineNum":"  166","line":"test \"interfaces don\'t share scope with variables\" {","class":"lineCov","hits":"2","order":"3279","possible_hits":"2",},
{"lineNum":"  167","line":"    try (CompilerTestCase{","class":"lineCov","hits":"1","order":"3281","possible_hits":"1",},
{"lineNum":"  168","line":"        .code = \"interface AnInterface { a: number; } const AnInterface = 0;\","},
{"lineNum":"  169","line":"    }).run();","class":"lineCov","hits":"1","order":"3280","possible_hits":"1",},
{"lineNum":"  170","line":"}"},
{"lineNum":"  171","line":""},
{"lineNum":"  172","line":"pub fn hoistClass(cmp: *Compiler, nd: Node) void {","class":"lineCov","hits":"2","order":"3302","possible_hits":"2",},
{"lineNum":"  173","line":"    std.debug.assert(nd.getType() == NodeType.ClassType);","class":"lineCov","hits":"1","order":"3303","possible_hits":"1",},
{"lineNum":"  174","line":""},
{"lineNum":"  175","line":"    const clsNd = nd.data.ClassType;","class":"linePartCov","hits":"2","order":"3304","possible_hits":"3",},
{"lineNum":"  176","line":"    const name = clsNd.name;","class":"lineCov","hits":"1","order":"3305","possible_hits":"1",},
{"lineNum":"  177","line":""},
{"lineNum":"  178","line":"    if (cmp.scope.getType(name)) |ty| {","class":"linePartCov","hits":"2","order":"3306","possible_hits":"3",},
{"lineNum":"  179","line":"        _ = ty;"},
{"lineNum":"  180","line":"        cmp.errors.append(CompileError.genericError(","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  181","line":"            GenericError.new(nd.csr, cmp.fmt(","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  182","line":"                \"Redefinition of type {s}\","},
{"lineNum":"  183","line":"                .{name},","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  184","line":"            )),"},
{"lineNum":"  185","line":"        )) catch allocate.reportAndExit();","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  186","line":"        return;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  187","line":"    }"},
{"lineNum":"  188","line":""},
{"lineNum":"  189","line":"    var t = allocate.create(cmp.alloc, Type);","class":"lineCov","hits":"1","order":"3307","possible_hits":"1",},
{"lineNum":"  190","line":"    t.* = Type{","class":"lineCov","hits":"1","order":"3308","possible_hits":"1",},
{"lineNum":"  191","line":"        .Class = Type.ClassType.new(","class":"lineCov","hits":"2","order":"3309","possible_hits":"2",},
{"lineNum":"  192","line":"            null,"},
{"lineNum":"  193","line":"            clsNd.name,","class":"lineCov","hits":"1","order":"3310","possible_hits":"1",},
{"lineNum":"  194","line":"            &[_]Type.ClassType.Member{},"},
{"lineNum":"  195","line":"        ),"},
{"lineNum":"  196","line":"    };"},
{"lineNum":"  197","line":""},
{"lineNum":"  198","line":"    cmp.scope.putType(name, t);","class":"lineCov","hits":"1","order":"3311","possible_hits":"1",},
{"lineNum":"  199","line":"}"},
{"lineNum":"  200","line":""},
{"lineNum":"  201","line":"fn resolveSuperType(","class":"lineCov","hits":"1","order":"3321","possible_hits":"1",},
{"lineNum":"  202","line":"    cmp: *Compiler,"},
{"lineNum":"  203","line":"    csr: Cursor,"},
{"lineNum":"  204","line":"    extends: ?[]const u8,"},
{"lineNum":"  205","line":") ?Type.Ptr {"},
{"lineNum":"  206","line":"    if (extends) |clsName| {","class":"lineCov","hits":"2","order":"3322","possible_hits":"2",},
{"lineNum":"  207","line":"        var nd = node.NodeImpl{"},
{"lineNum":"  208","line":"            .csr = csr,","class":"lineCov","hits":"1","order":"3379","possible_hits":"1",},
{"lineNum":"  209","line":"            .data = node.NodeData{ .TypeName = clsName },","class":"lineCov","hits":"1","order":"3380","possible_hits":"1",},
{"lineNum":"  210","line":"            .ty = null,","class":"lineCov","hits":"1","order":"3381","possible_hits":"1",},
{"lineNum":"  211","line":"        };"},
{"lineNum":"  212","line":""},
{"lineNum":"  213","line":"        if (cmp.findType(&nd)) |ty| {","class":"lineCov","hits":"2","order":"3382","possible_hits":"2",},
{"lineNum":"  214","line":"            if (ty.getType() == .Class) {","class":"lineCov","hits":"2","order":"3384","possible_hits":"2",},
{"lineNum":"  215","line":"                return ty;","class":"lineCov","hits":"1","order":"3385","possible_hits":"1",},
{"lineNum":"  216","line":"            } else {"},
{"lineNum":"  217","line":"                cmp.errors.append(CompileError.genericError(","class":"lineCov","hits":"2","order":"3425","possible_hits":"2",},
{"lineNum":"  218","line":"                    GenericError.new(csr, cmp.fmt(","class":"lineCov","hits":"2","order":"3426","possible_hits":"2",},
{"lineNum":"  219","line":"                        \"Superclass \'{s}\' is not a class\","},
{"lineNum":"  220","line":"                        .{clsName},","class":"lineCov","hits":"1","order":"3427","possible_hits":"1",},
{"lineNum":"  221","line":"                    )),"},
{"lineNum":"  222","line":"                )) catch allocate.reportAndExit();","class":"lineCov","hits":"1","order":"3428","possible_hits":"1",},
{"lineNum":"  223","line":"            }"},
{"lineNum":"  224","line":"        } else {"},
{"lineNum":"  225","line":"            cmp.errors.append(CompileError.genericError(","class":"lineCov","hits":"2","order":"3399","possible_hits":"2",},
{"lineNum":"  226","line":"                GenericError.new(csr, cmp.fmt(","class":"lineCov","hits":"2","order":"3400","possible_hits":"2",},
{"lineNum":"  227","line":"                    \"Superclass \'{s}\' is not in scope\","},
{"lineNum":"  228","line":"                    .{clsName},","class":"lineCov","hits":"1","order":"3401","possible_hits":"1",},
{"lineNum":"  229","line":"                )),"},
{"lineNum":"  230","line":"            )) catch allocate.reportAndExit();","class":"lineCov","hits":"1","order":"3409","possible_hits":"1",},
{"lineNum":"  231","line":"        }"},
{"lineNum":"  232","line":"    }"},
{"lineNum":"  233","line":""},
{"lineNum":"  234","line":"    return null;","class":"lineCov","hits":"1","order":"3323","possible_hits":"1",},
{"lineNum":"  235","line":"}"},
{"lineNum":"  236","line":""},
{"lineNum":"  237","line":"fn resolveMemberType(","class":"lineCov","hits":"1","order":"3391","possible_hits":"1",},
{"lineNum":"  238","line":"    cmp: *Compiler,"},
{"lineNum":"  239","line":"    csr: Cursor,"},
{"lineNum":"  240","line":"    className: []const u8,"},
{"lineNum":"  241","line":"    member: node.ClassTypeMember,"},
{"lineNum":"  242","line":") Type.Ptr {"},
{"lineNum":"  243","line":"    if (member.ty) |tyNode| {","class":"linePartCov","hits":"1","order":"3392","possible_hits":"2",},
{"lineNum":"  244","line":"        if (cmp.findType(tyNode)) |ty| {","class":"lineCov","hits":"1","order":"3393","possible_hits":"1",},
{"lineNum":"  245","line":"            return ty;","class":"lineCov","hits":"1","order":"3394","possible_hits":"1",},
{"lineNum":"  246","line":"        } else {"},
{"lineNum":"  247","line":"            cmp.errors.append(CompileError.genericError(","class":"lineCov","hits":"2","order":"3438","possible_hits":"2",},
{"lineNum":"  248","line":"                GenericError.new(tyNode.csr, cmp.fmt(","class":"lineCov","hits":"2","order":"3439","possible_hits":"2",},
{"lineNum":"  249","line":"                    \"Cannot resolve type for member \'{s}\' of class \'{s}\'\","},
{"lineNum":"  250","line":"                    .{ member.name, className },","class":"lineCov","hits":"1","order":"3440","possible_hits":"1",},
{"lineNum":"  251","line":"                )),"},
{"lineNum":"  252","line":"            )) catch allocate.reportAndExit();","class":"lineCov","hits":"1","order":"3441","possible_hits":"1",},
{"lineNum":"  253","line":"            return cmp.typebook.getAny();","class":"lineCov","hits":"1","order":"3442","possible_hits":"1",},
{"lineNum":"  254","line":"        }"},
{"lineNum":"  255","line":"    }"},
{"lineNum":"  256","line":""},
{"lineNum":"  257","line":"    return cmp.implicitAny(csr, member.name);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  258","line":"}"},
{"lineNum":"  259","line":""},
{"lineNum":"  260","line":"pub fn processClass(cmp: *Compiler, nd: Node) void {","class":"lineCov","hits":"2","order":"3313","possible_hits":"2",},
{"lineNum":"  261","line":"    std.debug.assert(nd.getType() == NodeType.ClassType);","class":"lineCov","hits":"1","order":"3314","possible_hits":"1",},
{"lineNum":"  262","line":""},
{"lineNum":"  263","line":"    const clsNd = nd.data.ClassType;","class":"linePartCov","hits":"2","order":"3315","possible_hits":"3",},
{"lineNum":"  264","line":""},
{"lineNum":"  265","line":"    var clsT = if (cmp.scope.getTypeMut(clsNd.name)) |clsTy|","class":"lineCov","hits":"2","order":"3316","possible_hits":"2",},
{"lineNum":"  266","line":"        clsTy","class":"lineCov","hits":"1","order":"3317","possible_hits":"1",},
{"lineNum":"  267","line":"    else"},
{"lineNum":"  268","line":"        std.debug.panic(\"Class \'{s}\' has not been prepared\", .{clsNd.name});","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  269","line":""},
{"lineNum":"  270","line":"    std.debug.assert(clsT.getType() == .Class);","class":"lineCov","hits":"1","order":"3318","possible_hits":"1",},
{"lineNum":"  271","line":""},
{"lineNum":"  272","line":"    var cls = &clsT.Class;","class":"linePartCov","hits":"2","order":"3319","possible_hits":"3",},
{"lineNum":"  273","line":""},
{"lineNum":"  274","line":"    cls.super = resolveSuperType(cmp, nd.csr, clsNd.extends);","class":"lineCov","hits":"1","order":"3320","possible_hits":"1",},
{"lineNum":"  275","line":""},
{"lineNum":"  276","line":"    cls.members = allocate.alloc(","class":"lineCov","hits":"2","order":"3324","possible_hits":"2",},
{"lineNum":"  277","line":"        cmp.alloc,","class":"lineCov","hits":"1","order":"3325","possible_hits":"1",},
{"lineNum":"  278","line":"        Type.ClassType.Member,"},
{"lineNum":"  279","line":"        clsNd.members.items.len,","class":"lineCov","hits":"1","order":"3326","possible_hits":"1",},
{"lineNum":"  280","line":"    );"},
{"lineNum":"  281","line":""},
{"lineNum":"  282","line":"    for (clsNd.members.items) |memberNd, index| {","class":"lineCov","hits":"3","order":"3327","possible_hits":"3",},
{"lineNum":"  283","line":"        std.debug.assert(memberNd.getType() == .ClassTypeMember);","class":"lineCov","hits":"1","order":"3386","possible_hits":"1",},
{"lineNum":"  284","line":"        const member = memberNd.data.ClassTypeMember;","class":"linePartCov","hits":"2","order":"3387","possible_hits":"3",},
{"lineNum":"  285","line":""},
{"lineNum":"  286","line":"        cls.members[index] = Type.ClassType.Member{","class":"linePartCov","hits":"1","order":"3388","possible_hits":"2",},
{"lineNum":"  287","line":"            .name = member.name,","class":"lineCov","hits":"1","order":"3389","possible_hits":"1",},
{"lineNum":"  288","line":"            .ty = resolveMemberType(cmp, memberNd.csr, cls.name, member),","class":"lineCov","hits":"1","order":"3390","possible_hits":"1",},
{"lineNum":"  289","line":"            .visibility = member.visibility,","class":"lineCov","hits":"1","order":"3395","possible_hits":"1",},
{"lineNum":"  290","line":"        };"},
{"lineNum":"  291","line":"    }"},
{"lineNum":"  292","line":""},
{"lineNum":"  293","line":"    cmp.typebook.putClass(clsT);","class":"lineCov","hits":"1","order":"3328","possible_hits":"1",},
{"lineNum":"  294","line":""},
{"lineNum":"  295","line":"    if (cmp.scope.getLocal(clsNd.name)) |previous| {","class":"lineCov","hits":"2","order":"3332","possible_hits":"2",},
{"lineNum":"  296","line":"        cmp.errors.append(CompileError.redefinitionError(","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  297","line":"            RedefinitionError.new(clsNd.name, previous.csr, nd.csr),","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  298","line":"        )) catch allocate.reportAndExit();","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  299","line":"        return;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  300","line":"    }"},
{"lineNum":"  301","line":""},
{"lineNum":"  302","line":"    // TODO: This should take the arguments to the constructor"},
{"lineNum":"  303","line":"    const constructorTy = cmp.typebook.getFunction(clsT, &[_]Type.Ptr{}, true);","class":"lineCov","hits":"1","order":"3333","possible_hits":"1",},
{"lineNum":"  304","line":"    cmp.scope.put(clsNd.name, constructorTy, true, nd.csr);","class":"lineCov","hits":"1","order":"3334","possible_hits":"1",},
{"lineNum":"  305","line":"}"},
{"lineNum":"  306","line":""},
{"lineNum":"  307","line":"test \"can compile an empty class declaration\" {","class":"lineCov","hits":"2","order":"3282","possible_hits":"2",},
{"lineNum":"  308","line":"    try (CompilerTestCase{","class":"lineCov","hits":"1","order":"3336","possible_hits":"1",},
{"lineNum":"  309","line":"        .code = \"class A {}\","},
{"lineNum":"  310","line":"    }).run();","class":"lineCov","hits":"1","order":"3283","possible_hits":"1",},
{"lineNum":"  311","line":"}"},
{"lineNum":"  312","line":""},
{"lineNum":"  313","line":"test \"can compile a class declaration with a superclass\" {","class":"lineCov","hits":"2","order":"3337","possible_hits":"2",},
{"lineNum":"  314","line":"    try (CompilerTestCase{","class":"lineCov","hits":"1","order":"3396","possible_hits":"1",},
{"lineNum":"  315","line":"        .code = \"class A {} class B extends A { private a: number; }\","},
{"lineNum":"  316","line":"    }).run();","class":"lineCov","hits":"1","order":"3338","possible_hits":"1",},
{"lineNum":"  317","line":"}"},
{"lineNum":"  318","line":""},
{"lineNum":"  319","line":"test \"superclass must be defined\" {","class":"lineCov","hits":"2","order":"3397","possible_hits":"2",},
{"lineNum":"  320","line":"    try (CompilerTestCase{","class":"lineCov","hits":"1","order":"3422","possible_hits":"1",},
{"lineNum":"  321","line":"        .code = \"class B extends A { private a: number; }\","},
{"lineNum":"  322","line":"        .check = (struct {"},
{"lineNum":"  323","line":"            pub fn check(case: CompilerTestCase, cmp: Compiler) anyerror!void {","class":"lineCov","hits":"2","order":"3410","possible_hits":"2",},
{"lineNum":"  324","line":"                try case.expectEqual(@intCast(usize, 1), cmp.errors.count());","class":"lineCov","hits":"1","order":"3411","possible_hits":"1",},
{"lineNum":"  325","line":"                const err = cmp.getError(0);","class":"lineCov","hits":"1","order":"3412","possible_hits":"1",},
{"lineNum":"  326","line":"                try case.expectEqual(err.getType(), .GenericError);","class":"lineCov","hits":"1","order":"3415","possible_hits":"1",},
{"lineNum":"  327","line":"                try case.expectEqualStrings(","class":"linePartCov","hits":"1","order":"3417","possible_hits":"2",},
{"lineNum":"  328","line":"                    \"Superclass \'A\' is not in scope\","},
{"lineNum":"  329","line":"                    err.GenericError.msg,","class":"linePartCov","hits":"2","order":"3416","possible_hits":"3",},
{"lineNum":"  330","line":"                );"},
{"lineNum":"  331","line":"            }"},
{"lineNum":"  332","line":"        }).check,"},
{"lineNum":"  333","line":"    }).run();","class":"lineCov","hits":"1","order":"3398","possible_hits":"1",},
{"lineNum":"  334","line":"}"},
{"lineNum":"  335","line":""},
{"lineNum":"  336","line":"test \"superclass must be a class\" {","class":"lineCov","hits":"2","order":"3423","possible_hits":"2",},
{"lineNum":"  337","line":"    try (CompilerTestCase{","class":"lineCov","hits":"1","order":"3435","possible_hits":"1",},
{"lineNum":"  338","line":"        .code = \"class B extends number { private a: number; }\","},
{"lineNum":"  339","line":"        .check = (struct {"},
{"lineNum":"  340","line":"            pub fn check(case: CompilerTestCase, cmp: Compiler) anyerror!void {","class":"lineCov","hits":"2","order":"3429","possible_hits":"2",},
{"lineNum":"  341","line":"                try case.expectEqual(@intCast(usize, 1), cmp.errors.count());","class":"lineCov","hits":"1","order":"3430","possible_hits":"1",},
{"lineNum":"  342","line":"                const err = cmp.getError(0);","class":"lineCov","hits":"1","order":"3431","possible_hits":"1",},
{"lineNum":"  343","line":"                try case.expectEqual(err.getType(), .GenericError);","class":"lineCov","hits":"1","order":"3432","possible_hits":"1",},
{"lineNum":"  344","line":"                try case.expectEqualStrings(","class":"linePartCov","hits":"1","order":"3434","possible_hits":"2",},
{"lineNum":"  345","line":"                    \"Superclass \'number\' is not a class\","},
{"lineNum":"  346","line":"                    err.GenericError.msg,","class":"linePartCov","hits":"2","order":"3433","possible_hits":"3",},
{"lineNum":"  347","line":"                );"},
{"lineNum":"  348","line":"            }"},
{"lineNum":"  349","line":"        }).check,"},
{"lineNum":"  350","line":"    }).run();","class":"lineCov","hits":"1","order":"3424","possible_hits":"1",},
{"lineNum":"  351","line":"}"},
{"lineNum":"  352","line":""},
{"lineNum":"  353","line":"test \"class member types must be valid\" {","class":"lineCov","hits":"2","order":"3436","possible_hits":"2",},
{"lineNum":"  354","line":"    try (CompilerTestCase{","class":"lineCov","hits":"1","order":"3455","possible_hits":"1",},
{"lineNum":"  355","line":"        .code = \"class A { private a: SomeType; }\","},
{"lineNum":"  356","line":"        .check = (struct {"},
{"lineNum":"  357","line":"            pub fn check(case: CompilerTestCase, cmp: Compiler) anyerror!void {","class":"lineCov","hits":"2","order":"3443","possible_hits":"2",},
{"lineNum":"  358","line":"                try cmp.reportErrors();","class":"lineCov","hits":"1","order":"3444","possible_hits":"1",},
{"lineNum":"  359","line":"                try case.expectEqual(@intCast(usize, 1), cmp.errors.count());","class":"lineCov","hits":"1","order":"3450","possible_hits":"1",},
{"lineNum":"  360","line":"                const err = cmp.getError(0);","class":"lineCov","hits":"1","order":"3451","possible_hits":"1",},
{"lineNum":"  361","line":"                try case.expectEqual(err.getType(), .GenericError);","class":"lineCov","hits":"1","order":"3452","possible_hits":"1",},
{"lineNum":"  362","line":"                try case.expectEqualStrings(","class":"linePartCov","hits":"1","order":"3454","possible_hits":"2",},
{"lineNum":"  363","line":"                    \"Cannot resolve type for member \'a\' of class \'A\'\","},
{"lineNum":"  364","line":"                    err.GenericError.msg,","class":"linePartCov","hits":"2","order":"3453","possible_hits":"3",},
{"lineNum":"  365","line":"                );"},
{"lineNum":"  366","line":"            }"},
{"lineNum":"  367","line":"        }).check,"},
{"lineNum":"  368","line":"    }).run();","class":"lineCov","hits":"1","order":"3437","possible_hits":"1",},
{"lineNum":"  369","line":"}"},
{"lineNum":"  370","line":""},
{"lineNum":"  371","line":"test \"classes share scope with variables\" {","class":"lineCov","hits":"2","order":"3456","possible_hits":"2",},
{"lineNum":"  372","line":"    try (CompilerTestCase{","class":"lineCov","hits":"1","order":"3473","possible_hits":"1",},
{"lineNum":"  373","line":"        .code = \"class A {} const A = 0;\","},
{"lineNum":"  374","line":"        .check = (struct {"},
{"lineNum":"  375","line":"            pub fn check(case: CompilerTestCase, cmp: Compiler) anyerror!void {","class":"lineCov","hits":"2","order":"3462","possible_hits":"2",},
{"lineNum":"  376","line":"                try case.expectEqual(@intCast(usize, 1), cmp.errors.count());","class":"lineCov","hits":"1","order":"3463","possible_hits":"1",},
{"lineNum":"  377","line":"                const err = cmp.getError(0);","class":"lineCov","hits":"1","order":"3464","possible_hits":"1",},
{"lineNum":"  378","line":"                try case.expectEqual(err.getType(), .RedefinitionError);","class":"lineCov","hits":"1","order":"3465","possible_hits":"1",},
{"lineNum":"  379","line":"                try case.expectEqualStrings(\"A\", err.RedefinitionError.name);","class":"lineCov","hits":"2","order":"3466","possible_hits":"2",},
{"lineNum":"  380","line":"                try case.expectEqual(","class":"linePartCov","hits":"1","order":"3469","possible_hits":"2",},
{"lineNum":"  381","line":"                    Cursor.new(1, 1),","class":"lineCov","hits":"1","order":"3467","possible_hits":"1",},
{"lineNum":"  382","line":"                    err.RedefinitionError.firstDefined,","class":"linePartCov","hits":"2","order":"3468","possible_hits":"3",},
{"lineNum":"  383","line":"                );"},
{"lineNum":"  384","line":"                try case.expectEqual(","class":"linePartCov","hits":"1","order":"3472","possible_hits":"2",},
{"lineNum":"  385","line":"                    Cursor.new(1, 12),","class":"lineCov","hits":"1","order":"3470","possible_hits":"1",},
{"lineNum":"  386","line":"                    err.RedefinitionError.secondDefined,","class":"linePartCov","hits":"2","order":"3471","possible_hits":"3",},
{"lineNum":"  387","line":"                );"},
{"lineNum":"  388","line":"            }"},
{"lineNum":"  389","line":"        }).check,"},
{"lineNum":"  390","line":"    }).run();","class":"lineCov","hits":"1","order":"3457","possible_hits":"1",},
{"lineNum":"  391","line":"}"},
]};
var percent_low = 25;var percent_high = 75;
var header = { "command" : "test", "date" : "2022-01-27 20:25:15", "instrumented" : 195, "covered" : 164,};
var merged_data = [];
